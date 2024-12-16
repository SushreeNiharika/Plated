import foodModel from "../models/foodModel.js";
import FileSystem from "fs";
import sharp from "sharp";
import multer from "multer";
import path from "path";

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure this folder exists or create it manually
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique filename
  },
});

const upload = multer({ storage: storage });

// Add food item
const addFood = async (req, res) => {
  try {
    // Ensure multer middleware has processed the file (this will be handled by the router)
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No image uploaded" });
    }

    // Define fixed dimensions for the image (250px width, 300px height)
    const width = 300;
    const height = 250;

    // Generate a new filename for the resized image
    const image_filename = `${Date.now()}-${req.file.originalname}`;
    const outputPath = path.join("uploads", image_filename);

    // Resize the image with sharp and save it to the 'uploads' folder
    await sharp(req.file.path)
      .resize(width, height) // Resize the image to the fixed dimensions
      .toFile(outputPath); // Save the resized image

    // Create a new food item using the foodModel
    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename, // Store the filename of the resized image
    });

    // Save the food item to the database
    await food.save();

    // Send success response
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    // Log and send error response if something fails
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error, food did not add" });
  }
};

// List all food items
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error in food list" });
  }
};

// Remove food item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    FileSystem.unlink(`uploads/${food.image}`, () => {}); // Delete the image file from uploads folder
    await foodModel.findByIdAndDelete(req.body.id); // Remove the food item from DB
    res.json({ success: true, data: "Food item deleted" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Food item has not removed" });
  }
};

export { addFood, listFood, removeFood };

/*import foodModel from "../models/foodModel.js";
import FileSystem from "fs";
import multer from "multer";
import sharp from "sharp";

// Add food item
const addFood = async (req, res) => {
  try {
    // Ensure multer middleware has processed the file
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No image uploaded" });
    }

    // Get the uploaded file's name
    let image_filename = `${req.file.filename}`;

    // Create a new food item using the foodModel
    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename, 
      const width = 300; // Set your desired width
    const height = 300; 
    });

    // Save the food item to the database
    await food.save();

    // Send success response
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    // Log and send error response if something fails
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error, food did not add" });
  }
};

//all food list

const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error in food list " });
  }
};

//remove food item

const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    FileSystem.unlink(`uploads/${food.image}`, () => {});
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, data: "food item deleted" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Food item has not removed " });
  }
};

export { addFood, listFood, removeFood };

/*import foodModel from "../models/foodModel.js";
import fs from "fs";

// Add food item
const addFood = async (req, res) => {
  // Ensure multer middleware has processed the file
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No image uploaded" });
  }
};

// Get the uploaded file's name
let image_filename = `${req.file.filename}`;

// Create a new food item using the foodModel
const food = new foodModel({
  name: req.body.name,
  description: req.body.description,
  price: req.body.price,
  category: req.body.category,
  image: image_filename, // Save the image filename
});

try {
  await food.save();
  res.json({ success: true, message: "Food Added" });
} catch (error) {
  console.error(error);
  res.status(500).json({ success: false, message: "Error, food did not add" });
}

export { addFood };*/
