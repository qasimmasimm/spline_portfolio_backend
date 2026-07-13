const { Schema, SchemaType, model } = require("mongoose");

const projectschema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    duration: {
      type: String,
    },
    challenges: {
      type: String,
    },
    solution: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true },
);

const Project = model("Project", projectschema);
module.exports = Project;
