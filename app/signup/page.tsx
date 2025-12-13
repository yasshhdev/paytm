"use client"

import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { NextResponse } from "next/server"
import {  useRef } from "react"
import z  from "zod"

export default function Signup (){
    
    const router = useRouter();
    

    const emailref = useRef <HTMLInputElement | null>(null)
    const firstref = useRef <HTMLInputElement | null>(null)
    const lastref = useRef <HTMLInputElement | null>(null)
    const passref = useRef <HTMLInputElement | null>(null)


    async function siup(){

        const zonSchema =  z.object({
            email : z.string(),
            firstname : z.string(),
            lastname :z.string(),
            password: z.string()

        })
         
        const validate = zonSchema.safeParse({
                email :emailref.current?.value,
                firstname : firstref.current?.value,
                 lastname :lastref.current?.value,
                 password  :passref.current?.value})

        if(!validate.success){return alert("Enter proper credentials")}


        const x = await axios.post("/api/v1/user",{
                email :emailref.current?.value,
                firstname : firstref.current?.value,
                 lastname :lastref.current?.value,
                 password  :passref.current?.value
        })
        if (x.status===200){
            
            router.push("/")

        }
        else if (x.status === 401) {alert("Nah bro same emnal id")}
        else {alert("Nah bro fucked up")}
    }



    return (
        <div>
            <input type="text" placeholder="email" ref = {emailref}/>
            <input type="text" placeholder="firstname"  ref={firstref}/>
            <input type="text" placeholder="lastname"  ref={lastref}/>
            <input type="password" placeholder="password" ref={passref}/>

            <button onClick={siup}>Signup</button>
        </div>
    )

}