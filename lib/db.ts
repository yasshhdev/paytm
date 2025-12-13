import mongoose,{Schema}  from "mongoose";


const UserSchema = new Schema ({
    email :  {type:String , required : true , unique :true},
    firstname : String,
    lastname :String,
    password : String 
})





const UserModel = mongoose.model ("User",UserSchema)
export {
    UserModel
}
