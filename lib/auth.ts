"use server"

import { signIn, signOut } from "@/auth"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export const login = async () => {
    await signIn("github", {redirectTo:'/'})
};

export const loginwithGoogle = async () => {
    await signIn("google", {redirectTo:'/'})
};

export const loginwithFacebook = async () => {
    await signIn("facebook", {redirectTo:'/'})
};

export const logout = async() => {
    await signOut({redirectTo:'/sign-in'})
}

// Utility function to protect routes that require authentication
export const requireAuth = async () => {
    const session = await auth()
    if (!session) {
        redirect('/sign-in')
    }
    return session
}

// Utility function to redirect authenticated users away from auth pages
export const redirectIfAuthenticated = async () => {
    const session = await auth()
    if (session) {
        redirect('/')
    }
}