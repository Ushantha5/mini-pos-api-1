import Item from "../models/Item.js";


export const getAllitems = async (req, res) => {
  try {
    const items = await Item.find();
    // Create The item Info.

    res.status(200).json({
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error items ",
      error: error.message,
    });
  }
};

export const getitemById = async (req, res) => {
  try {
    const items = await Item.findById(req.params.id);

    if (!Item) {
      return res.status(404).json({
        success: false,
        error: "item not found",
      });
    }

    res.json({
      success: true,
      data: items,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        error: "Invalid item ID format",
      });
    }

    res.status(500).json({
      success: false,
      error: "Failed to fetch item",
    });
  }
};

export const createitem = async (req, res) => {
  try {
    const newitem = new Item(req.body);
    const saveditem = await newitem.save();

    res.status(201).json({
      success: true,
      data: saveditem,
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
    //     error: "Failed to create item",
    //   });
  }
};

export const updateitem = async (req, res) => {
  try {
    const items = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return updated document
      runValidators: true, // Run model validators on update
    });

    if (!Item) {
      return res.status(404).json({
        success: false,
        error: "item not found",
      });
    }

    res.json({
      success: true,
      data: items,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        error: "Invalid item ID format",
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
      error: "Failed to update item",
    });
  }
};

export const deleteitem = async (req, res) => {
  try {
    const items = await Item.findByIdAndDelete(req.params.id);

    if (!items) {
      return res.status(404).json({
        success: false,
        error: "item not found",
      });
    }

    res.json({
      success: true,
      message: "item deleted successfully",
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        error: "Invalid item ID format",
      });
    }
    res.status(500).json({
      success: false,
      error: "Failed to delete item",
    });
  }
};


import Item from "../models/Item.js";
