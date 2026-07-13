const Project=require("../modals/projects");

class projectscontroller{
    constructor(){
        
    }

     async Create(req, res) {
    try {
      const obj = req.body;
      console.log(req.body);
      if (
        !obj.name ||
        !obj.duration ||
        !obj.challenges ||
        !obj.solution ||
        !obj.description 
      ) {
        return res.status(400).json({ message: "All Fields are required" });
      }
      obj.image = req.file ? req.file.path : "";
      const created = await Project.create(obj);
      console.log(created)

      return res.status(201).json(created);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  }

  async GetAll(req, res) {
    try {
      const found = await Project.find();
      return res.status(200).json(found);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  }

  async GetById(req, res) {
    try {
      const id = req.params.id;
      const found = await Project.findById(id);
      if (!found) {
        return res.status(404).json({ message: "Project not found" });
      }
      return res.status(200).json(found);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  }

  async Update(req, res) {
    try {
      const id = req.params.id;
      const updateData = { ...req.body };
      if (req.file) {
        updateData.image = req.file.path;
      }
      const update = await Project.findByIdAndUpdate(id, updateData, {new: true,});

      if (!update) {
        return res.status(400).json({ message: "cannot update" });
      }
      return res.status(200).json(update);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  }

  async Delete(req, res) {
  try {
    const id = req.params.id;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    await Project.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Project deleted successfully",
      id,
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
}
}

module.exports=new projectscontroller();