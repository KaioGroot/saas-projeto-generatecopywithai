import { NextResponse } from 'next/server';
import { auth } from '@/firebase/config';

export async function middleware(request) {
    const { pathname } = request.nextUrl;

    // Verifica se o usuário está autenticado no Firebase
    const session = request.cookies.get('session')?.value;

    // Se tentar acessar /persuasivo sem estar autenticado
    if (pathname === '/persuasivo') {
        if (!session) {
            const redirectUrl = new URL('/login', request.url);
            redirectUrl.searchParams.set('from', pathname);
            return NextResponse.redirect(redirectUrl);
        }
    }

    // Se tentar acessar /login ou /signup já estando autenticado
    if ((pathname === '/login' || pathname === '/signup') && session) {
        return NextResponse.redirect(new URL('/persuasivo', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/persuasivo', '/login', '/signup'],
};
