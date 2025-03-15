import { NextResponse } from 'next/server';

// Função para verificar se a rota requer autenticação
function requiresAuth(pathname) {
    const protectedRoutes = ['/persuasivo'];
    return protectedRoutes.includes(pathname);
}

export async function middleware(request) {
    const { pathname } = request.nextUrl;
    console.log('Middleware - Pathname:', pathname);

    // Permite o acesso direto à página persuasivo
    // A verificação de autenticação será feita no lado do cliente
    if (pathname === '/persuasivo') {
        return NextResponse.next();
    }

    // Se tentar acessar /login ou /signup com uma sessão ativa
    const session = request.cookies.get('session');
    if ((pathname === '/login' || pathname === '/signup') && session?.value) {
        return NextResponse.redirect(new URL('/persuasivo', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/persuasivo', '/login', '/signup'],
};
