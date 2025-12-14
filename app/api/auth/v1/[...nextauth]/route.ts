import NextAuth from "next-auth"
import  CredentialsProvider  from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import twitter from "next-auth/providers/twitter"
import { userAgent } from "next/server"

const handler = NextAuth({

    providers:[

        CredentialsProvider ({
            name:"Email" , 
            credentials :{
                username : {label:"Username", type:"text" , placeholder:"xxx"},
                password : {label:"Password" , type:"password" , placeholder:"xxx"}
            },
            
            async authorize (credentials){
                console.log(credentials?.username)
                console.log(credentials?.password)
                if (!credentials?.username || !credentials.password){
                    return null
                }
                if (credentials.username === "yash" && credentials.password ==="855")
                {
                             return { id: "1", name: "Yash" }; 
                }
                

                return null
            },
        }),
        
  ],
    
})

export { handler as GET, handler as POST }