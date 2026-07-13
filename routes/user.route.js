const {Router}=require("express");
const usercontroller=require("../controllers/user.controller");
const auth=require("../middleware/auth");
const userRouter=Router();

userRouter.post("/signup",usercontroller.Signup);
userRouter.post("/login",usercontroller.Login);
userRouter.get("/:id",usercontroller.GetById);
userRouter.put("/:id", usercontroller.Update);
userRouter.delete("/:id",usercontroller.Delete);

module.exports=userRouter;
