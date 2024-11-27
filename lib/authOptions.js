import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
    providers: [
      CredentialsProvider({
        name: 'credentials',
        credentials: {},
        async authorize(credentials) {
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
    }
    
  }