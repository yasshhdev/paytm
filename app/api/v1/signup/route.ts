
import { UserModel } from "@/app/db";
import { NextRequest, NextResponse } from "next/server";
import mongoose, { mongo } from "mongoose";




(async()=>{

   await mongoose.connect(process.env.DATABASE_URL)

})();
export async function POST(req:NextRequest){

    try {

    const {email,firstname , lastname , password}  = await req.json()
    //done zod validation in fe

        const exist = await UserModel.findOne({
            email:email
        })
        if (exist ){return NextResponse.json({status:401,msg:"Email already exist"})}

        

    const x =await UserModel.create({
        email,firstname,lastname,password
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