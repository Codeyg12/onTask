const { Schema, model } = require("mongoose");
const Task = require("./Task");

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  projectUser: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

const Project = model("Project", projectSchema);

module.exports = Project;
