import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://sushreeniharika666:fooddeliveryapp@cluster0.n24ma.mongodb.net/fooddelivery"
    )
    .then(() => console.log("DB connected"));
};
