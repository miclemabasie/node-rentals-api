import mongoose from "mongoose";

const LandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  isFeatured: {
    type: Boolean,
    required: false,
    default: false,
  },
  location: {
    type: String,
    required: true,
  },
  width: {
    type: Number,
    required: false,
    default: 0.0,
  },
  length: {
    type: Number,
    required: false,
    default: 0.0,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Land = mongoose.model("Land", LandSchema);

export default Land;
