import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow login page through
  if (pathname === '/doctor/login') {
    return NextResponse.next()
  }

  const token = request.cookies.get('medipic_doctor_token')
  if (!token || token.value !== 'valid') {
    const loginUrl = new URL('/doctor/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/doctor', '/doctor/:path*'],
}
