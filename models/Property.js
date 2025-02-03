import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema({
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
  location: {
    type: String,
    required: true,
  },
  isFeatured: {
    type: Boolean,
    required: false,
    default: false,
  },
  image: {
    type: String, // URL of the image
    required: false, // Optional field
    default:
      "https://images.pexels.com/photos/29116206/pexels-photo-29116206/free-photo-of-modern-apartment-building-in-montreal.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Property = mongoose.model("Property", PropertySchema);

export default Property;
