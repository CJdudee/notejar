import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJwt } from 'next-auth/jwt'

declare module "next-auth" {
    interface Session {
        user: {
            id: string, 
            role: string,
            name: string,
            profileColor: string,
        } & DefaultSession
    }

    interface User extends DefaultUser {
        roles: string,
        username: string,
        profileColor: string,
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJwt {
        role: string,
        profileColor: string,
    }
}