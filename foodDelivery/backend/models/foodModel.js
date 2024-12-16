import mongoose, { Types } from "mongoose";

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: {
    type: Number,
    required: true,
    min: [1, "Price must be at least Rs 1"],
    max: [1000, "Price must not exceed Rs 1000"],
  },
  image: { type: String, required: true },
  category: { type: String, required: true },
});

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

export default foodModel;
