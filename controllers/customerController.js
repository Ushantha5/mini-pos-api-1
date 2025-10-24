import customer from "../models/Customer.js";

export const getAllCustomers = async (req, res) => {
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

export const getCustomerById = async (req, res) => {
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

export const createCustomer = async (req, res) => {
  try {
    const newCustomer = new customer(req.body);

    const savedCustomer = await newCustomer.save();

    console.log(newCustomer);

    console.log("after post");

    return res.status(201).json({
      success: true,
      data: savedCustomer,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
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
    res.status(500).json({
      success: false,
      error: "Failed to create customer",
    });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const customers = await customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // Return updated document
        runValidators: true, // Run model validators on update
      }
    );

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

export const deleteCustomer = async (req, res) => {
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
