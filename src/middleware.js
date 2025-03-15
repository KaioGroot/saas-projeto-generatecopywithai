import { NextResponse } from 'next/server';
import { auth } from '@/firebase/config';

export async function middleware(request) {
    const { pathname } = request.nextUrl;

    // Verifica se o usuário está autenticado no Firebase
    const session = request.cookies.get('session')?.value;

    // Se tentar acessar /persuasivo sem estar autenticado
    if (pathname === '/persuasivo') {
        if (!session) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/persuasivo'],
};
