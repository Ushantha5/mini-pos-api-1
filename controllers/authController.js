import Sale from "../models/Sale.js";

import auth from "../models/auth.js";

export const getAllauths = async (req, res) => {
  try {
    const auths = await auth.find();
    // Create The auth Info.

    res.status(200).json({
      data: auths,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error auths ",
      error: error.message,
    });
  }
};

export const getauthById = async (req, res) => {
  try {
    const auths = await auth.findById(req.params.id);

    if (!auth) {
      return res.status(404).json({
        success: false,
        error: "auth not found",
      });
    }

    res.json({
      success: true,
      data: auths,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        error: "Invalid auth ID format",
      });
    }

    res.status(500).json({
      success: false,
      error: "Failed to fetch auth",
    });
  }
};

export const createauth = async (req, res) => {
  try {
    const newauth = new auth(req.body);
    const savedauth = await newauth.save();

    res.status(201).json({
      success: true,
      data: savedauth,
    });
  } catch (error) {
    if (error.title === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => ({
        field: err.path,
        message: err.message,
      }));
      return res.status(400).json({
        success: false,
        error: "Validation failed",
        details: errors,
      });
    }
    //   res.status(500).json({
    //     success: false,
    //     error: "Failed to create auth",
    //   });
  }
};

export const updateauth = async (req, res) => {
  try {
    const auths = await auth.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return updated document
      runValidators: true, // Run model validators on update
    });

    if (!auth) {
      return res.status(404).json({
        success: false,
        error: "auth not found",
      });
    }

    res.json({
      success: true,
      data: auths,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        error: "Invalid auth ID format",
      });
    }
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        errors,
      });
    }
    res.status(500).json({
      success: false,
      error: "Failed to update auth",
    });
  }
};

export const deleteauth = async (req, res) => {
  try {
    const auths = await auth.findByIdAndDelete(req.params.id);

    if (!auths) {
      return res.status(404).json({
        success: false,
        error: "auth not found",
      });
    }

    res.json({
      success: true,
      message: "auth deleted successfully",
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        error: "Invalid auth ID format",
      });
    }
    res.status(500).json({
      success: false,
      error: "Failed to delete auth",
    });
  }
};


import Item from "../models/Item.js";
