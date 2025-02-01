import mongoose from "mongoose";
import User from "../models/User.js";
import Land from "../models/Land.js";
import { errorHandler } from "../utils/error.js";

export const listLand = async (req, res) => {
  try {
    const lands = await Land.find();
    res.status(200).json(lands);
  } catch (error) {}
};

export const createLand = async (req, res, next) => {
  try {
    const { name, description, price, location, owner, width, length } =
      req.body;

    // validate the owner's ID
    if (!mongoose.Types.ObjectId.isValid(owner)) {
      return next(errorHandler("Invalid Owner ID", 400));
    }

    // check if Owner with given id exists
    const existingUser = await User.findById(owner);
    if (!existingUser) {
      return next(errorHandler("Owner not found", 404));
    }

    console.log(name, description, price, location, owner);
    const newLand = new Land({
      name,
      description,
      price,
      location,
      width,
      length,
      owner,
    });
    await newLand.save();
    res.status(201).json({
      message: "land created successfully",
      land: newLand,
    });
  } catch (error) {
    next(error);
  }
};

export const updateLand = async (req, res, next) => {
  try {
    const { id } = req.params; // get the query params
    const updates = req.body; // get the data to be updated
    // validate the land ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(errorHandler("Inavlid land ID", 400));
    }

    // try to get and update the land
    const updatedLand = await Land.findByIdAndUpdate(id, updates, {
      new: true, // Return the updated document
      runValidators: true, // Ensure all model validators are applied
    });

    // check if the land was found and updated
    if (!updatedLand) {
      return next(errorHandler("land not found", 404));
    }

    res.status(200).json({
      message: "land was updated successfully",
      land: updatedLand,
    });
  } catch (error) {
    next(error);
  }
};

export const getLandDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    // Verify the land Id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(errorHandler("Invalid land ID", 400));
    }

    // check if the prperty exists
    const land = await Land.findById(id);

    if (!land) {
      return next(errorHandler("land with id not found", 404));
    }

    return res.status(200).json(land);
  } catch (error) {
    next(error);
  }
};

export const deleteLand = async (req, res, next) => {
  try {
    const { id } = req.params;
    // verify the land id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(errorHandler("Invalid land Id", 400));
    }

    const deletedland = await Land.findByIdAndDelete(id);

    if (!deletedland) {
      return next(errorHandler("land not found", 404));
    }

    res.status(204).json("land deleted successfully.");
  } catch (error) {
    next(error);
  }
};
