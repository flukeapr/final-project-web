import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const token = await getToken({ req: request });
   console.log("middleware")

   
   
   if(request.nextUrl.pathname === '/'){
    if(token){
      return NextResponse.redirect(new URL('/homepage', request.url))
    }else{
      return NextResponse.next()
    }
   }
   if (request.nextUrl.pathname === '/allusers') {
    return NextResponse.next();
  }


  if(!token) {
    return NextResponse.redirect(new URL('/', request.url))
  }else {
    return NextResponse.next()
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/homepage/:path*","/","/result","/edituser/:path*","/media","/community/:path*","/support/:path*"],
}