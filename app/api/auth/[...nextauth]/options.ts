import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GitHubProvider, { GithubProfile } from 'next-auth/providers/github'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '@/app/context/mongodb'
import User from '@/models/User'
import bcrypt from 'bcrypt'

export const options: NextAuthOptions = {

    adapter: MongoDBAdapter(clientPromise),

    providers: [
        // GitHubProvider({
        //     profile(profile: GithubProfile) {

        //         // console.log(profile)
        //         return {
        //             ...profile,
        //             role: profile.role ?? 'user',
        //             id: profile.id.toString()
        //         }
        //     },
        //     clientId: process.env.GITHUB_ID as string,
        //     clientSecret: process.env.GITHUB_SECRET as string
        // }),

        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "your cool name"
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "enter your password",
                }
            },
            async authorize(credentials) {

                //this is where you have to retrieve user data to verify with credentials
                //https://next-auth.js.org/configuration/providers/credentials

                if (!credentials) return null

                 const client = await clientPromise
                const usersCollection = client.db(process.env.DB_NAME).collection("users")
                const founduser = await usersCollection.findOne({username: credentials?.username})
                //console.log(founduser)

                if (!credentials?.username || !credentials?.password) throw new Error('username and password fuck up')


                if (!founduser) throw new Error('problem with finding user')
                  // Any object returned will be saved in `user` property of the JWT

                const rightPwd = await bcrypt.compare(credentials?.password, founduser.password)


                //console.log(rightPwd)
                if (!rightPwd) return null

                 const {roles, _id, username } = founduser

                 const id = _id

                const user = {
                    id: _id,
                    roles: founduser.roles,
                    username: founduser.username,
                    profileColor: founduser.profileColor
                } as any 
               

                if (rightPwd) {
                    
                    return user
                 } else {
                    return null
                 }
                
            }
        })
    ],


    // that the Credentials provider can only be used if JSON Web Tokens are enabled for sessions.

    callbacks: {
        async signIn({ user, account, profile, email, credentials}) {

            // const {id, e } = user
            // console.log(user)
            // console.log(account)
            // console.log(profile)
            //console.log(email)
            //console.log(credentials)
            // const client = await clientPromise()
            // const db = client.db()

            if (account?.provider === 'github' ) {
                const client = await clientPromise
                const usersCollection = client.db(process.env.DB_NAME).collection("users")
            const founduser = await usersCollection.findOne({user})
            if (founduser) {
                return true
            } else {
                return false
            }
            }


            const isAllowedToSignIn = true
            if (isAllowedToSignIn) {
                return true

            } else {
                return false
            }


            
        },
        //https: //authjs. dev/guides /basics/role-based-access-control#persisting-the-role
        async jwt({token, user, account, profile }) {
            //console.log(account)
            //console.log(profile)
            //console.log(token)
            //console.log(user)
            //console.log(account)
            //console.log(profile)
            if (user) {

                token.role = user.roles
                token.id = user.id
                token.username = user.username
                token.profileColor = user.profileColor
            }
            
           
            
            
            return token
        },
        //if you want to use the role in client components
        async session({ session, user, token }) {
            //console.log(token)
            if (session?.user) {
                session.user.role = token.role
                session.user.name = token.username as string ?? 'no name'
                session.user.id = token.id as string
                session.user.profileColor = token.profileColor

            }
            
            
            //console.log(session)
            return session
        },
    },

    session: {
        strategy: 'jwt',
        
        
    },

    debug: process.env.NODE_ENV === 'development',
    
    pages: {
        signIn: '/auth/signin'
    },
    
    
    secret: process.env.NEXTAUTH_SECRET,
}