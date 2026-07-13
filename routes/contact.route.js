const {Router}=require("express");
const contactcontroller=require("../controllers/mailprovier.controller");
const contactRouter=Router();

contactRouter.post("/", contactcontroller.Mail);

module.exports = contactRouter;