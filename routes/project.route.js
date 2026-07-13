const {Router}=require("express");
const projectscontroller=require("../controllers/projects.controller");
const upload=require("../provider/multer")
const projectRouter=Router();

projectRouter.post("/",upload.single("img"),projectscontroller.Create);
projectRouter.get("/",upload.single("img"),projectscontroller.GetAll);
projectRouter.get("/:id",projectscontroller.GetById);
projectRouter.put("/:id", upload.single("img"), projectscontroller.Update);
projectRouter.delete("/:id",projectscontroller.Delete);

module.exports=projectRouter;
