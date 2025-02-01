import mongoose from "mongoose";
import Property from "../models/Property.js";
import User from "../models/User.js";
import { errorHandler } from "../utils/error.js";

export const listProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {}
};

export const createProperty = async (req, res, next) => {
  try {
    const { name, description, price, location, owner } = req.body;

    // validate the owner's ID
    if (!mongoose.Types.ObjectId.isValid(owner)) {
      return next(errorHandler("Invalid Owner ID", 400));
    }

    // check if Owner with given id exists
    const existingUser = await User.findById(owner);
    if (!existingUser) {
      return next(errorHandler("No user found with given ID for 'owner'", 404));
    }

    console.log(name, description, price, location, owner);
    const newProperty = new Property({
      name,
      description,
      price,
      location,
      owner,
    });
    await newProperty.save();
    res.status(201).json({
      message: "Property created successfully",
      property: newProperty,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePrperty = async (req, res, next) => {
  try {
    const { id } = req.params; // get the query params
    const updates = req.body; // get the data to be updated
    // validate the property ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(errorHandler("Inavlid Property ID", 400));
    }

    // try to get and update the property
    const updatedProperty = await Property.findByIdAndUpdate(id, updates, {
      new: true, // Return the updated document
      runValidators: true, // Ensure all model validators are applied
    });

    // check if the property was found and updated
    if (!updatedProperty) {
      return next(errorHandler("Property not found", 404));
    }

    res.status(200).json({
      message: "Property was updated successfully",
      property: updatedProperty,
    });
  } catch (error) {
    next(error);
  }
};

export const getPropertyDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    // Verify the property Id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(errorHandler("Invalid Property ID", 400));
    }

    // check if the prperty exists
    const property = await Property.findById(id);

    if (!property) {
      return next(errorHandler("Property with id not found", 404));
    }

    return res.status(200).json(property);
  } catch (error) {
    next(error);
  }
};

export const deleteProperty = async (req, res, next) => {
  try {
    const { id } = req.params;
    // verify the property id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(errorHandler("Invalid Property Id", 400));
    }

    const deletedProperty = await Property.findByIdAndDelete(id);

    if (!deletedProperty) {
      return next(errorHandler("Property not found", 404));
    }

    res.status(204).json("property deleted successfully.");
  } catch (error) {
    next(error);
  }
};
