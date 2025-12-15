import mongoose,{Schema}  from "mongoose";


const UserSchema = new Schema ({
    email :  {type:String , required : true , unique :true},
    name:  String,
    password : {type:String , required:true}
})





const UserModel = mongoose.model ("User",UserSchema)
export {
    UserModel
}
