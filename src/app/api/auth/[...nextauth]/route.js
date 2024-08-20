import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { query } from '../../../../../lib/ConnectDb'
import bcrypt from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { getToken } from 'next-auth/jwt'
import GoogleProvider from "next-auth/providers/google";
import { signIn, signOut } from 'next-auth/react'



export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        try {
          const { email, password } = credentials
          const res = await fetch(process.env.NEXT_PUBLIC_serverURL + "/api/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
          })
          const data = await res.json()
          if (data.error) {
            throw new Error(data.error)
          }
          if (data.user) {
            console.log(data.user)
            return data.user
          }

        
        } catch (error) {
          console.log(error)
          throw new Error(error.message);
        }
       
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
   
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
    signOut: '/'
  },
  callbacks: {
    jwt: async ({ token, user }) => {
    
      
      return {...token,...user}
    },
    session: async ({ session, token }) => {
      session.user = token
      return session
    }
  },
  async signIn({ user, account, profile }) {
   if(user) return true
    return false;
    
  
  }
  
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

