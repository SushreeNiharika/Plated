// models/userModel.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: {
      type: Map,
      of: Number, // itemId as key and quantity as value
      default: {}, // Initialize as an empty object
    },
  },
  { minimize: false } // Ensures that empty objects are stored
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;

/*import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
  },
  { minimize: false }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;*/
