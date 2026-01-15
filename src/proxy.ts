// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export function middleware(request: NextRequest) {
//   const pathname = request.nextUrl.pathname

//   // Check if the pathname starts with a locale
//   const pathnameHasLocale = ['/en', '/fr'].some(
//     (locale) => pathname.startsWith(locale) || pathname === locale
//   )

//   if (!pathnameHasLocale) {
//     // Redirect to default locale (en)
//     return NextResponse.redirect(
//       new URL(`/en${pathname === '/' ? '' : pathname}`, request.url)
//     )
//   }
// }

// export const config = {
//   matcher: [
//     // Skip all internal paths (_next)
//     // Skip all API routes
//     '/((?!api|_next/static|_next/image|favicon.ico).*)',
//   ],
// } 

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    // Skip middleware for static files
    if (pathname.startsWith('/images/'))
    {
        return NextResponse.next()
    }

    // Check if the pathname starts with a locale
    const pathnameHasLocale = ['/en', '/fr'].some(
        (locale) => pathname.startsWith(locale) || pathname === locale
    )

    if (!pathnameHasLocale) {
        // Redirect to default locale (en)
        return NextResponse.redirect(
            new URL(`/en${pathname === '/' ? '' : pathname}`, request.url)
        )
    }
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        // Skip all API routes
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}