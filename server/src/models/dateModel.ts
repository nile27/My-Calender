import mongoose from "mongoose";

const dateSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true
  },
  month: {
    type: Number,
    required: true
  },
  day: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  tagName: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    required: true
  },

});

const CalenderData = mongoose.model("Calender", dateSchema);

export default CalenderData;