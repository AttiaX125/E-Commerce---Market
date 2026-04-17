 import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy (req : NextRequest){
    console.log(req)
    const pathName = req.nextUrl.pathname;
    const isAuth : boolean = pathName === '/login' || pathName === '/register';
    const userToken = await getToken({req , secret: process.env.AUTH_SECRET});
    if(isAuth){
        if(userToken){
           return NextResponse.redirect(new URL ('/', req.url))
        }
        return NextResponse.next();
    }
    if (userToken){
        return NextResponse.next();
    }
    return NextResponse.redirect(new URL ('/login', req.url))
}

export const config = {
    matcher: ['/cart' , '/shop', '/brands', '/login', '/register']
}