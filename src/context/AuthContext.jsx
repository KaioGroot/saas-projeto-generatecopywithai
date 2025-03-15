'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '@/firebase/config';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';
import { useRouter, useSearchParams } from 'next/navigation';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const searchParams = useSearchParams();

    async function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    async function login(email, password) {
        const result = await signInWithEmailAndPassword(auth, email, password);
        const token = await result.user.getIdToken();
        document.cookie = `session=${token}; path=/; max-age=3600; SameSite=Lax`;
        return result;
    }

    async function loginWithGoogle() {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const token = await result.user.getIdToken();
        document.cookie = `session=${token}; path=/; max-age=3600; SameSite=Lax`;
        return result;
    }

    async function logout() {
        await signOut(auth);
        document.cookie = 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                console.log('Usuário autenticado:', user.email);
                setCurrentUser(user);
                const token = await user.getIdToken();
                document.cookie = `session=${token}; path=/; max-age=3600; SameSite=Lax`;
            } else {
                console.log('Usuário não autenticado');
                setCurrentUser(null);
                document.cookie = 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    // Redireciona após o login
    useEffect(() => {
        if (currentUser && !loading) {
            console.log('Redirecionando usuário autenticado');
            const from = searchParams.get('from') || '/persuasivo';
            router.push(from);
        }
    }, [currentUser, loading, router, searchParams]);

    const value = {
        currentUser,
        signup,
        login,
        loginWithGoogle,
        logout,
    };

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
