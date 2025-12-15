"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import {  useRef } from "react"
import z  from "zod"

export default function Signup (){
    
    const router = useRouter();
    

    const emailref = useRef <HTMLInputElement | null>(null)
    const nameref = useRef <HTMLInputElement | null>(null)
    const passref = useRef <HTMLInputElement | null>(null)


    async function siup(){

        const zodSchema =  z.object({
            email: z.string().email("Invalid email"),
            name: z.string().min(1, "Name is required"),
            password: z.string().min(6, "Password must be at least 6 chars"), 

        })
         
            const validate = zodSchema.safeParse({
                    email: emailref.current?.value ?? "",
                    name: nameref.current?.value ?? "",
                    password: passref.current?.value ?? "",
            });

            if (!validate.success) {
              alert(validate.error.issues[0].message);
            return;
            }


            try {

                
        const x = await axios.post("/api/signup",{
                email :emailref.current?.value,
                 name:nameref.current?.value,
                 password  :passref.current?.value
        })
        if (x.status===200){
            
            router.push("/")

        }
            }catch (err: any) {
                if (err.response?.status === 401) {
                    alert("Email already exists");
                } else {
                    alert("Signup failed");
                }
                }
        
    }



    return (
        <div className="m-3 p-3">
            <input type="text" placeholder="email" ref = {emailref}/>
            <input type="text" placeholder="Name"  ref={nameref}/>
            <input type="password" placeholder="password" ref={passref}/>

            <button onClick={siup} className="cursor-pointer">Signup</button>
        </div>
    )

}