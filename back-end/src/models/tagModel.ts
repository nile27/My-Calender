import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  color: {
    type: String,
    required: true,
  },
  tagName: {
    type: String,
    required: true,
  },
});

const Tag = mongoose.model("Calender", tagSchema);

export default tagSchema;
