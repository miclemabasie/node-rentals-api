import User from "../models/User.js";
import Car from "../models/Car.js";

export const listCar = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {}
};

export const createCar = async (req, res, next) => {
  try {
    const { name, description, price, location, owner } = req.body;

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
    const newCar = new Car({
      name,
      description,
      price,
      location,
      owner,
    });
    await newCar.save();
    res.status(201).json({
      message: "Car created successfully",
      car: newCar,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCar = async (req, res, next) => {
  try {
    const { id } = req.params; // get the query params
    const updates = req.body; // get the data to be updated
    // validate the car ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(errorHandler("Inavlid car ID", 400));
    }

    // try to get and update the car
    const updatedCar = await Car.findByIdAndUpdate(id, updates, {
      new: true, // Return the updated document
      runValidators: true, // Ensure all model validators are applied
    });

    // check if the car was found and updated
    if (!updatedCar) {
      return next(errorHandler("car not found", 404));
    }

    res.status(200).json({
      message: "car was updated successfully",
      car: updatedCar,
    });
  } catch (error) {
    next(error);
  }
};

export const getCarDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    // Verify the car Id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(errorHandler("Invalid car ID", 400));
    }

    // check if the prperty exists
    const car = await Car.findById(id);

    if (!car) {
      return next(errorHandler("car with id not found", 404));
    }

    return res.status(200).json(car);
  } catch (error) {
    next(error);
  }
};

export const deleteCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    // verify the car id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(errorHandler("Invalid car Id", 400));
    }

    const deletedCar = await Car.findByIdAndDelete(id);

    if (!deletedCar) {
      return next(errorHandler("car not found", 404));
    }

    res.status(204).json("car deleted successfully.");
  } catch (error) {
    next(error);
  }
};
