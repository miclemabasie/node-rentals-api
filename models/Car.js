import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
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
  image: {
    type: String,
    required: true,
    default:
      "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Car = mongoose.model("Car", carSchema);

export default Car;
