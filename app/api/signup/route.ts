
import { UserModel } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import bcrypt from "bcrypt"



(async()=>{

   await mongoose.connect(process.env.DATABASE_URL)

})();


export async function POST(req:NextRequest){

    try {

    const {email,name, password}  = await req.json()

        if (!email || !name || !password) {
         return NextResponse.json(
                    { error: "Missing fields" },
                    { status: 400 }
                );
        }


        const exist = await UserModel.findOne({
            email:email
        })
        if (exist ){return NextResponse.json({status:401,msg:"Email already exist"})}

        const hashed =await bcrypt.hash(password,5)

    const x =await UserModel.create({
        email,name,password:hashed
    })
    if(x)
    {
           return NextResponse.json({
            msg:"Successful",
            status:200
           })
    }
    else {
        return NextResponse.json({
            status:400,
            msg:"Something went wrong"
        })
        

    }
    }
    catch (err) {return NextResponse.json({status :400 , msg:"Error occured "})}

}