import userModel from "../models/userModel.js";

// Add item to user cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.body.userId });
    //console.log("userData", userData);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    /* let cartData = userData.cartData || {};

    if (!cartData[req.body.itemId]) {
      console.log("if", req.body.itemId);
      cartData[req.body.itemId] = 1;
    } else {
      console.log("Else");
      cartData[req.body.itemId] += 1;
    }*/

    let currentQuantity = userData.cartData.get(req.body.itemId) || 0;
    userData.cartData.set(req.body.itemId, currentQuantity + 1);
    const cartData = userData.cartData;
    console.log("cartData", userData.cartData);
    userData.save();
    /* await userModel.findByIdAndUpdate(
      req.body.userId,
      { cartData },
      { new: true }
    );*/

    res.json({ success: true, message: "Added To Cart", cartData });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error adding item to cart" });
  }
};

// Remove item from user cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (cartData[req.body.itemId]) {
      if (cartData[req.body.itemId] > 0) {
        cartData[req.body.itemId] -= 1;
      } else {
        delete cartData[req.body.itemId];
      }

      await userModel.findByIdAndUpdate(req.body.userId, { cartData });

      res.json({ success: true, message: "Removed from Cart" });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Item not found in cart" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error updating cart" });
  }
};

// Fetch items from user cart
const getCart = async (req, res) => {
  try {
    console.log("cart", req.body.userId);
    let userData = await userModel.findOne({ _id: req.body.userId });
    //let userData = await userModel.findById(req.body.userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, cartData: userData.cartData || {} });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching cart data" });
  }
};

export { addToCart, removeFromCart, getCart };
