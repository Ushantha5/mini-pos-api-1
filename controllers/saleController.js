import Sale from "../models/Sale.js";

import sale from "../models/sale.js";

export const getAllsales = async (req, res) => {
  try {
    const sales = await sale.find();
    // Create The sale Info.

    res.status(200).json({
      data: sales,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error sales ",
      error: error.message,
    });
  }
};

export const getsaleById = async (req, res) => {
  try {
    const sales = await sale.findById(req.params.id);

    if (!sale) {
      return res.status(404).json({
        success: false,
        error: "sale not found",
      });
    }

    res.json({
      success: true,
      data: sales,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        error: "Invalid sale ID format",
      });
    }

    res.status(500).json({
      success: false,
      error: "Failed to fetch sale",
    });
  }
};

export const createsale = async (req, res) => {
  try {
    const newsale = new sale(req.body);
    const savedsale = await newsale.save();

    res.status(201).json({
      success: true,
      data: savedsale,
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
    //     error: "Failed to create sale",
    //   });
  }
};

export const updatesale = async (req, res) => {
  try {
    const sales = await sale.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return updated document
      runValidators: true, // Run model validators on update
    });

    if (!sale) {
      return res.status(404).json({
        success: false,
        error: "sale not found",
      });
    }

    res.json({
      success: true,
      data: sales,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        error: "Invalid sale ID format",
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
      error: "Failed to update sale",
    });
  }
};

export const deletesale = async (req, res) => {
  try {
    const sales = await sale.findByIdAndDelete(req.params.id);

    if (!sales) {
      return res.status(404).json({
        success: false,
        error: "sale not found",
      });
    }

    res.json({
      success: true,
      message: "sale deleted successfully",
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        error: "Invalid sale ID format",
      });
    }
    res.status(500).json({
      success: false,
      error: "Failed to delete sale",
    });
  }
};


import Item from "../models/Item.js";
