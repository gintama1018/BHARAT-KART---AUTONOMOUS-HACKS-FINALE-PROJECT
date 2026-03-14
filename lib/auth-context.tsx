"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { 
    onAuthStateChanged, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signOut as firebaseSignOut,
    updateProfile as firebaseUpdateProfile,
    User as FirebaseUser
} from 'firebase/auth'
import { auth, googleProvider } from "./firebase"

// We are adapting Profile interface to avoid massive rewrite of the existing codebase
export interface Profile {
    id: string
    full_name: string | null
    phone: string | null
    avatar_url: string | null
    created_at: string
}

interface AuthContextType {
    user: FirebaseUser | null
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
    const [user, setUser] = useState<FirebaseUser | null>(null)
    const [profile, setProfile] = useState<Profile | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
            setUser(currentUser)
            if (currentUser) {
                // Construct a mock profile since we are not connecting to a database for profiles yet
                setProfile({
                    id: currentUser.uid,
                    full_name: currentUser.displayName || null,
                    phone: currentUser.phoneNumber || null,
                    avatar_url: currentUser.photoURL || null,
                    created_at: currentUser.metadata.creationTime || new Date().toISOString()
                })
            } else {
                setProfile(null)
            }
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    const signUp = async (email: string, password: string, fullName: string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            if (userCredential.user) {
                await firebaseUpdateProfile(userCredential.user, {
                    displayName: fullName
                })
                // Manually update the profile state for immediate UI feedback
                setProfile({
                    id: userCredential.user.uid,
                    full_name: fullName,
                    phone: null,
                    avatar_url: null,
                    created_at: new Date().toISOString()
                })
            }
            return { error: null }
        } catch (error: any) {
            return { error: new Error(error.message || "Failed to sign up") }
        }
    }

    const signIn = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            return { error: null }
        } catch (error: any) {
            return { error: new Error(error.message || "Failed to sign in") }
        }
    }

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
            return { error: null }
        } catch (error: any) {
            return { error: new Error(error.message || "Failed to sign in with Google") }
        }
    }

    const signOut = async () => {
        try {
            await firebaseSignOut(auth)
            setUser(null)
            setProfile(null)
        } catch (error) {
            console.error("Sign out error", error)
        }
    }

    const updateProfile = async (updates: Partial<Profile>) => {
        if (!user) return { error: new Error("Not authenticated") }
        
        try {
            await firebaseUpdateProfile(user, {
                displayName: updates.full_name !== undefined ? updates.full_name : user.displayName,
                photoURL: updates.avatar_url !== undefined ? updates.avatar_url : user.photoURL,
            })
            
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