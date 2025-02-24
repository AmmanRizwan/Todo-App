import { Schema, models, model } from "mongoose";

const TodoSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
      maxLength: 500,
    },
  },
  {
    timestamps: true,
  }
);

const Todo = models.Todo || model("Todo", TodoSchema);

export default Todo;
