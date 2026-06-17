import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_PATHS = ['/enter', '/api/auth']

export function middleware(request: NextRequest) {
  // Redirect HTTP to HTTPS in production
  if (
    process.env.NODE_ENV === 'production' &&
    request.headers.get('x-forwarded-proto') === 'http'
  ) {
    return NextResponse.redirect(
      `https://${request.headers.get('host')}${request.nextUrl.pathname}`,
      301
    )
  }

  const { pathname } = request.nextUrl

  // Allow public paths through without auth check
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next()
  }

  // Check for valid auth cookie
  const auth = request.cookies.get('site-auth')?.value
  if (auth !== process.env.SITE_PASSWORD) {
    const url = request.nextUrl.clone()
    url.pathname = '/enter'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
}
