import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJwt } from 'next-auth/jwt'

declare module "next-auth" {
    interface Session {
        user: {
            id: string, 
            role: string,
            name: string,
        } & DefaultSession
    }

    interface User extends DefaultUser {
        roles: string,
        username: string,
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJwt {
        role: string
    }
}