import { NextResponse } from 'next/server';

// Função para verificar se a rota requer autenticação
function requiresAuth(pathname) {
    const protectedRoutes = ['/persuasivo'];
    return protectedRoutes.includes(pathname);
}

export async function middleware(request) {
    const { pathname } = request.nextUrl;
    console.log('Middleware - Pathname:', pathname);

    // Se a rota não requer autenticação, permite o acesso
    if (!requiresAuth(pathname)) {
        return NextResponse.next();
    }

    // Verifica o cookie de autenticação
    const session = request.cookies.get('session');
    const isAuthenticated = !!session?.value;

    // Se não estiver autenticado e tentar acessar uma rota protegida
    if (!isAuthenticated && requiresAuth(pathname)) {
        console.log('Middleware - Redirecionando para login');
        const url = new URL('/login', request.url);
        url.searchParams.set('from', pathname);
        return NextResponse.redirect(url);
    }

    // Se tentar acessar /persuasivo sem estar autenticado
    if (pathname === '/persuasivo') {
        console.log('Middleware - Acesso permitido a /persuasivo');
    }

    // Se tentar acessar /login ou /signup já estando autenticado
    if ((pathname === '/login' || pathname === '/signup') && isAuthenticated) {
        console.log('Middleware - Redirecionando usuário autenticado para /persuasivo');
        return NextResponse.redirect(new URL('/persuasivo', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/persuasivo', '/login', '/signup'],
};
