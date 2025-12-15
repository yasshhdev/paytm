
"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";

export default function Authbuttons (){


     const router = useRouter();
    const session = useSession();


    return (
        <div>
               <button onClick={()=>router.push("/signup")} className="cursor-pointer m-4">Signup</button>
            {session.status==="authenticated" && <button className="cursor-pointer" onClick={()=>signOut()}>Signout</button>}
            {session.status==="unauthenticated" && <button className="cursor-pointer" onClick={()=>signIn()}>Signin</button>}

        </div>
    )
}