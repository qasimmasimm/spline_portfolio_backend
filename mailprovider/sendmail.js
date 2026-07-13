const nodemailer=require("nodemailer");

const transpoter=nodemailer.createTransport({
    host:"smpt.gamil.com",
    port:465,
    secure:true,
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    },
});

module.exports=transpoter