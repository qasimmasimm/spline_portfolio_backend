const express = require("express");
require("dotenv").config();
const { connect } = require("mongoose");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");

//my routerss
const projectRouter = require("./routes/project.route");
const userRouter = require("./routes/user.route");
const contactRouter = require("./routes/contact.route");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://spline-portfolio-frontend.vercel.app",
    ],
    credentials: true,
  }),
);



app.use(cors({
  origin: "https://spline-portfolio-frontend-qjmc-n30tun6en-qasimmasimms-projects.vercel.app/",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/upload", express.static("upload"));

app.use("/auth", userRouter);
app.use("/contact", contactRouter);
app.use("/projects", projectRouter);



module.exports = app;



const connected=async ()=>{
  try{
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected to Database successfully");
    const PORT=process.env.PORT || 8080;
    app.listen(PORT,()=>{
      console.log(`app is running at ${PORT}`)
    })
  }catch(err){
    console.log("Database connection failed:",err.message)
  }
}

connected();