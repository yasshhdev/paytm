import mongoose,{Schema}  from "mongoose";


const UserSchema = new Schema ({
    email :  {type:String , required : true , unique :true},
    name:  String,
    password : {type:String , required:true}
})

const AccountSchema = new Schema ({
    account_no : {type : String , required :true },
    user_id : {type : mongoose.Types.ObjectId , ref:"User"}
})





const UserModel = mongoose.model ("User",UserSchema)
export {
    UserModel
}
