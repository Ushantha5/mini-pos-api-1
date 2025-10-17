import Item from "../models/ItemRoutes.js";

export const getAllBooks = async (req, res) => {
  try {
    const Item = await Item.find();
    // id, title, desc..
    // Create The Item Info.

    res.status(200).json({
      data: Item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error Items ",
      error: error.message,
    });
  }
};
