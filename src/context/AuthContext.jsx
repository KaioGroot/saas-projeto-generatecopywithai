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
        return signInWithEmailAndPassword(auth, email, password);
    }

    async function loginWithGoogle() {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    }

    async function logout() {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // Usuário está logado
                setCurrentUser(user);

                // Cria um token de sessão
                const token = await user.getIdToken();

                // Define o cookie de sessão com configurações mais permissivas
                document.cookie = `session=${token}; path=/; max-age=3600`;
            } else {
                // Usuário está deslogado
                setCurrentUser(null);

                // Remove o cookie de sessão
                document.cookie = 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    // Redireciona após o login
    useEffect(() => {
        if (currentUser && !loading) {
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
