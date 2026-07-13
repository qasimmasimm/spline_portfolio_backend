const Contact=require("../modals/contact");
const nodemailer=require("nodemailer");

class contactcontroller{
    constructor(){

    }

    async Mail(req,res){
        try{
            const {name,email,subject,idea}=req.body;
            const contact=await Contact.create({
                name,
                email,
                subject,
                idea
            }); 
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

     await transporter.sendMail({
  from: email,
  to: process.env.EMAIL_USER,
  subject: subject,
  text: `
Name: ${name}

Email: ${email}

Idea:
${idea}
`,
});

      res.status(201).json({ success: true, message: "Message sent successfully", contact });


        }
        catch(err){
            console.log(err.message);
            return res.status(500).json({message:err.message});
        }
    }
}


module.exports=new contactcontroller();