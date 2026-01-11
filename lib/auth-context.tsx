"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { User, AuthError, Session, AuthChangeEvent } from "@supabase/supabase-js"
import { createClient, Profile } from "./supabase"

interface AuthContextType {
    user: User | null
    profile: Profile | null
    loading: boolean
    signUp: (email: string, password: string, fullName: string) => Promise<{ error: AuthError | Error | null }>
    signIn: (email: string, password: string) => Promise<{ error: AuthError | Error | null }>
    signInWithGoogle: () => Promise<{ error: AuthError | Error | null }>
    signOut: () => Promise<void>
    updateProfile: (updates: Partial<Profile>) => Promise<{ error: Error | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [profile, setProfile] = useState<Profile | null>(null)
    const [loading, setLoading] = useState(true)
    const [supabase] = useState(() => createClient())

    useEffect(() => {
        // If Supabase client is not available, just set loading to false
        if (!supabase) {
            setLoading(false)
            return
        }

        // Get initial session
        const getSession = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession()
                setUser(session?.user ?? null)
                if (session?.user) {
                    await fetchProfile(session.user.id)
                }
            } catch (e) {
                console.warn('Auth session error:', e)
            }
            setLoading(false)
        }

        getSession()

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            setUser(session?.user ?? null)
            if (session?.user) {
                await fetchProfile(session.user.id)
            } else {
                setProfile(null)
            }
            setLoading(false)
        })

        return () => subscription.unsubscribe()
    }, [supabase])

    const fetchProfile = async (userId: string) => {
        if (!supabase) return
        try {
            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", userId)
                .single()

            if (!error && data) {
                setProfile(data)
            }
        } catch (e) {
            console.warn('Profile fetch error:', e)
        }
    }

    const signUp = async (email: string, password: string, fullName: string) => {
        if (!supabase) return { error: new Error("Supabase not configured") }

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName
                }
            }
        })

        if (!error && data.user) {
            // Create profile
            await supabase.from("profiles").insert({
                id: data.user.id,
                full_name: fullName
            })
        }

        return { error }
    }

    const signIn = async (email: string, password: string) => {
        if (!supabase) return { error: new Error("Supabase not configured") }

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        })
        return { error }
    }

    const signInWithGoogle = async () => {
        if (!supabase) return { error: new Error("Supabase not configured") }

        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`
            }
        })
        return { error }
    }

    const signOut = async () => {
        if (!supabase) return
        await supabase.auth.signOut()
        setUser(null)
        setProfile(null)
    }

    const updateProfile = async (updates: Partial<Profile>) => {
        if (!supabase) return { error: new Error("Supabase not configured") }
        if (!user) return { error: new Error("Not authenticated") }

        const { error } = await supabase
            .from("profiles")
            .update(updates)
            .eq("id", user.id)

        if (!error) {
            setProfile(prev => prev ? { ...prev, ...updates } : null)
        }

        return { error }
    }

    return (
        <AuthContext.Provider value={{
            user,
            profile,
            loading,
            signUp,
            signIn,
            signInWithGoogle,
            signOut,
            updateProfile
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

