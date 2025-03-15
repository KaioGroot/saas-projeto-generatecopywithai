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

    const setCookie = async (user) => {
        if (user) {
            const token = await user.getIdToken();
            document.cookie = `session=${token}; path=/; max-age=3600`;
        } else {
            document.cookie = 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        }
    };

    async function signup(email, password) {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await setCookie(result.user);
        return result;
    }

    async function login(email, password) {
        const result = await signInWithEmailAndPassword(auth, email, password);
        await setCookie(result.user);
        return result;
    }

    async function loginWithGoogle() {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        await setCookie(result.user);
        return result;
    }

    async function logout() {
        await signOut(auth);
        await setCookie(null);
        router.push('/login');
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            console.log('Estado de autenticação mudou:', user ? 'Autenticado' : 'Não autenticado');

            if (user) {
                setCurrentUser(user);
                await setCookie(user);
            } else {
                setCurrentUser(null);
                await setCookie(null);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (currentUser && !loading) {
            const from = searchParams.get('from') || '/persuasivo';
            console.log('Redirecionando para:', from);
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
