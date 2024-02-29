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
  count: {
    type: Number,
  },
});

const Tag = mongoose.model("tags", tagSchema);

export default Tag;
