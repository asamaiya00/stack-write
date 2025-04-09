import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getOrCreateStorage } from './models/server/storageSetup'
import getOrCreateDatabase from './models/server/dbSetup'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  getOrCreateStorage()
  getOrCreateDatabase()
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
/* match all request paths except for the the ones that starts with:
  - api
  - _next/static
  - _next/image
  - favicon.com

  */
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
