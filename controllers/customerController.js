import Sale from "../models/Sale.js";

import customer from "../models/customer.js";

export const getAllcustomers = async (req, res) => {
  try {
    const customers = await customer.find();
    // Create The customer Info.

    res.status(200).json({
      data: customers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error customers ",
      error: error.message,
    });
  }
};

export const getcustomerById = async (req, res) => {
  try {
    const customers = await customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        error: "customer not found",
      });
    }

    res.json({
      success: true,
      data: customers,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        error: "Invalid customer ID format",
      });
    }

    res.status(500).json({
      success: false,
      error: "Failed to fetch customer",
    });
  }
};

export const createcustomer = async (req, res) => {
  try {
    const newcustomer = new customer(req.body);
    const savedcustomer = await newcustomer.save();

    res.status(201).json({
      success: true,
      data: savedcustomer,
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
    //     error: "Failed to create customer",
    //   });
  }
};

export const updatecustomer = async (req, res) => {
  try {
    const customers = await customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return updated document
      runValidators: true, // Run model validators on update
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        error: "customer not found",
      });
    }

    res.json({
      success: true,
      data: customers,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        error: "Invalid customer ID format",
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
      error: "Failed to update customer",
    });
  }
};

export const deletecustomer = async (req, res) => {
  try {
    const customers = await customer.findByIdAndDelete(req.params.id);

    if (!customers) {
      return res.status(404).json({
        success: false,
        error: "customer not found",
      });
    }

    res.json({
      success: true,
      message: "customer deleted successfully",
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        error: "Invalid customer ID format",
      });
    }
    res.status(500).json({
      success: false,
      error: "Failed to delete customer",
    });
  }
};


import Item from "../models/Item.js";
