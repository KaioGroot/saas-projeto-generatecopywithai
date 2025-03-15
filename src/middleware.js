import { NextResponse } from 'next/server';

export async function middleware(request) {
    const { pathname } = request.nextUrl;
    console.log('Middleware - Pathname:', pathname);

    // Verifica se o usuário está autenticado através do cookie
    const session = request.cookies.get('session')?.value;
    console.log('Middleware - Session cookie:', session ? 'Presente' : 'Ausente');

    // Se tentar acessar /persuasivo sem estar autenticado
    if (pathname === '/persuasivo') {
        if (!session) {
            console.log('Middleware - Redirecionando para login');
            const redirectUrl = new URL('/login', request.url);
            redirectUrl.searchParams.set('from', pathname);
            return NextResponse.redirect(redirectUrl);
        }
        console.log('Middleware - Acesso permitido a /persuasivo');
    }

    // Se tentar acessar /login ou /signup já estando autenticado
    if ((pathname === '/login' || pathname === '/signup') && session) {
        console.log('Middleware - Redirecionando usuário autenticado para /persuasivo');
        return NextResponse.redirect(new URL('/persuasivo', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/persuasivo', '/login', '/signup'],
};
