import mongoose from "mongoose";

const dateSchema = new mongoose.Schema({
  year: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  tagName: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    required: true,
  },
});

const CalenderData = mongoose.model("Calender", dateSchema);

export default CalenderData;
