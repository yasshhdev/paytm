import { UserModel } from "@/lib/db"
import NextAuth, { NextAuthOptions } from "next-auth"
import  CredentialsProvider  from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"


export const authoptions:NextAuthOptions  = {

    providers:[

        CredentialsProvider ({
            name:"Email" , 
            credentials :{
                email :{label:"Email" , type:"text" , placeholder:""},
                name : {label:"Username", type:"text" , placeholder:""},
                password : {label:"Password" , type:"password" , placeholder:""}
            },
            
            async authorize (credentials){

                if (!credentials?.name || !credentials.password || !credentials.email){
                    return null
                }
               
                

                const user = await UserModel.findOne({
                    email:credentials.email

                })

                    if(!user){
                    return null
                      }
            
                const hashed =await bcrypt.compare(credentials.password,user?.password)
                
                if(hashed)
                    {
                        return { 
                            id: user._id.toString(),
                            email: user.email,
                            name: user.name
                             }
                    }
            
                

                return null
            },
        }),
        GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!, }),

      GithubProvider({
        clientId:process.env.GITHUB_CLIENT_ID!,

        clientSecret: process.env.GITHUB_CLEINT_SECRET! })
        
  ],
    
}
const handler = NextAuth (authoptions); 

export { handler as GET, handler as POST }