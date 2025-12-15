import NextAuth, { NextAuthOptions } from "next-auth"
import  CredentialsProvider  from "next-auth/providers/credentials"

export const authoptions:NextAuthOptions  = {

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
    
}
const handler = NextAuth (authoptions); 

export { handler as GET, handler as POST }