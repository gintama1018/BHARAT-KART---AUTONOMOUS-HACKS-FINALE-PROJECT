"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { createClient } from "./supabase"
import { User } from "@supabase/supabase-js"

// We are adapting Profile interface to avoid massive rewrite of the existing codebase
export interface Profile {
    id: string
    full_name: string | null
    phone: string | null
    avatar_url: string | null
    created_at: string
}

interface AuthContextType {
    user: User | null
    profile: Profile | null
    loading: boolean
    signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>
    signIn: (email: string, password: string) => Promise<{ error: Error | null }>
    signInWithGoogle: () => Promise<{ error: Error | null }>
    signOut: () => Promise<void>
    updateProfile: (updates: Partial<Profile>) => Promise<{ error: Error | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const supabase = createClient()
    const [user, setUser] = useState<User | null>(null)
    const [profile, setProfile] = useState<Profile | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchInitialSession = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            const currentUser = session?.user || null
            setUser(currentUser)
            updateProfileState(currentUser)
            setLoading(false)
        }

        fetchInitialSession()

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            const currentUser = session?.user || null
            setUser(currentUser)
            updateProfileState(currentUser)
            setLoading(false)
        })

        return () => subscription.unsubscribe()
    }, [supabase.auth])

    const updateProfileState = (currentUser: User | null) => {
        if (currentUser) {
            setProfile({
                id: currentUser.id,
                full_name: currentUser.user_metadata?.full_name || null,
                phone: currentUser.phone || null,
                avatar_url: currentUser.user_metadata?.avatar_url || null,
                created_at: currentUser.created_at || new Date().toISOString()
            })
        } else {
            setProfile(null)
        }
    }

    const signUp = async (email: string, password: string, fullName: string) => {
        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                    }
                }
            })
            if (error) throw error
            return { error: null }
        } catch (error: any) {
            return { error: new Error(error.message || "Failed to sign up") }
        }
    }

    const signIn = async (email: string, password: string) => {
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })
            if (error) throw error
            return { error: null }
        } catch (error: any) {
            return { error: new Error(error.message || "Failed to sign in") }
        }
    }

    const signInWithGoogle = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
            })
            if (error) throw error
            return { error: null }
        } catch (error: any) {
            return { error: new Error(error.message || "Failed to sign in with Google") }
        }
    }

    const signOut = async () => {
        try {
            await supabase.auth.signOut()
            setUser(null)
            setProfile(null)
        } catch (error) {
            console.error("Sign out error", error)
        }
    }

    const updateProfile = async (updates: Partial<Profile>) => {
        if (!user) return { error: new Error("Not authenticated") }
        
        try {
            const { error } = await supabase.auth.updateUser({
                data: {
                    full_name: updates.full_name !== undefined ? updates.full_name : user.user_metadata?.full_name,
                    avatar_url: updates.avatar_url !== undefined ? updates.avatar_url : user.user_metadata?.avatar_url,
                }
            })
            if (error) throw error
            
            setProfile(prev => prev ? { ...prev, ...updates } : null)
            return { error: null }
        } catch (error: any) {
            return { error: new Error(error.message || "Failed to update profile") }
        }
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