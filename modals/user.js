const { Schema,model,SchemaType } = require("mongoose");

const userschema=new Schema({
    fullname:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true,
    },
    contact:{
        type:String,
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    }

},{timestamps:true},
)

const User=model("User",userschema);
module.exports= User;


