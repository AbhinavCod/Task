import mongoose from "mongoose";
import bcrypt from "bcryptjs";

type User = {
    email:string,
    username:string,
    password:string,
}

const Schema = new mongoose.Schema<User>({
    email:{type:String,required:true,unique:true},
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true,minlength:6}
})

Schema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,8);
    }
    next();
})

const UserModel = mongoose.model("User",Schema);

export default UserModel;