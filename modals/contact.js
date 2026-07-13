const {Schema,model}=require("mongoose")

const contactSchema= new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    subject:{
        type:String,
        require:true
    },
    idea:{
        type:String,
        require:true
    },
    isRead:{
        type:Boolean,
        default:false
    },
},
  { timestamps: true }
);

const Contact=model("Contact",contactSchema);
module.exports=Contact;