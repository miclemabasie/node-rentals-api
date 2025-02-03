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
  image: {
    type: String,
    required: false,
    default:
      "https://images.pexels.com/photos/46160/field-clouds-sky-earth-46160.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Land = mongoose.model("Land", LandSchema);

export default Land;
