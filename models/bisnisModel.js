const mongoose = require("mongoose");

const bisnisSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  description_2: {
    type: String,
    require: [true, "Description_2 is required"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
  date: {
    type: String,
    required: [true, "Date is required"],
  },
  content: {
    type: String,
    required: [true, "content artikel is required"],
  },
  content_2: {
    type: String,
    required: [true, "Conten_2 artikel is required"],
  },
  content_3: {
    type: String,
    required: [true, "Conten_3 artikel is required"],
  },
  content_4: {
    type: String,
    required: [true, "Conten_4 artikel is required"],
  },
  content_5: {
    type: String,
    required: [true, "Conten_5 artikel is required"],
  },
});

module.exports = mongoose.model("Bisnis", bisnisSchema);
