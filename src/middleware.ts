import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    if(request.nextUrl.pathname === '/a'){
        console.log(request);
    }
//     if(request.nextUrl.pathname.includes('/_next/image')){
//   console.log(request.nextUrl.pathname);}
  
}
 
// See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/_next/image',
// }