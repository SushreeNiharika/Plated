import React, { useState, useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const CartPromoCode = ({ getTotalCartAmount }) => {
  const [promoCode, setPromoCode] = useState("");
  const [isPromoValid, setIsPromoValid] = useState(true);

  const handlePromoSubmit = (e) => {
    e.preventDefault();
    const validPromoCodes = ["DISCOUNT10", "FREESHIP"];
    if (validPromoCodes.includes(promoCode.trim())) {
      alert("Promo code applied successfully!");
      setIsPromoValid(true);
    } else {
      setIsPromoValid(false);
    }
  };

  return (
    <div className="cart-promocode">
      <div>
        <p>If you have any promo code, enter it here:</p>
        <div className="cart-promocode-input">
          <input
            type="text"
            placeholder="Promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
          <button type="submit" onClick={handlePromoSubmit}>
            Submit
          </button>
        </div>
        {!isPromoValid && (
          <p className="error-message" style={{ color: "red" }}>
            Invalid promo code. Please try again.
          </p>
        )}
      </div>
    </div>
  );
};

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } =
    useContext(StoreContext);

  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={url + "/images/" + item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>Rs {item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>Rs {item.price * cartItems[item._id]}</p>
                  <button
                    className="cross"
                    onClick={() => removeFromCart(item._id)}
                  >
                    x
                  </button>
                </div>
                <hr />
              </div>
            );
          }
          return null; // Explicitly return null for items not in the cart
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>Rs {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>Rs {getTotalCartAmount() === 0 ? 0 : 50}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                Rs {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 50}
              </b>
            </div>
          </div>
          <button onClick={() => navigate("/order")}>
            PROCEED TO CHECKOUT
          </button>
        </div>
        <CartPromoCode getTotalCartAmount={getTotalCartAmount} />
      </div>
    </div>
  );
};

export default Cart;

/*import React, { useState, useContext } from "react";
import "./Cart.css";

import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } =
    useContext(StoreContext);

  const navigate = useNavigate(); // Initialize useNavigate

  //for promocode
  const CartPromoCode = () => {
    const [promoCode, setPromoCode] = useState("");
    const [isPromoValid, setIsPromoValid] = useState(true);

    const handlePromoSubmit = (e) => {
      e.preventDefault();
      // Add your promo code validation logic here
      const validPromoCodes = ["DISCOUNT10", "FREESHIP"]; // Example valid promo codes
      if (validPromoCodes.includes(promoCode.trim())) {
        alert("Promo code applied successfully!");
        setIsPromoValid(true);
      } else {
        setIsPromoValid(false);
      }
    };

    return (
      <div className="cart">
        <div className="cart-items">
          <div className="cart-items-title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          <hr />
          {food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
                <div key={item._id}>
                  <div className="cart-items-title cart-items-item">
                    <img src={url + "/images/" + item.image} alt={item.name} />
                    <p>{item.name}</p>
                    <p>Rs {item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p> Rs {item.price * cartItems[item._id]}</p>
                    <button
                      className="cross"
                      onClick={() => removeFromCart(item._id)}
                    >
                      x
                    </button>
                  </div>
                  <hr />
                </div>
              );
            } else {
              return null; // Explicitly return null for items not in the cart
            }
          })}
        </div>
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className="cart-total-details">
                <p> Subtoal</p>
                <p>Rs {getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>Rs {getTotalCartAmount() === 0 ? 0 : 50}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>
                  Rs{" "}
                  {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 50}
                </b>
              </div>
            </div>
            <button onClick={() => navigate("/order")}>
              PROCEED TO CHECKOUT
            </button>
          </div>
          <div className="cart-promocode">
            <div>
              <p>If you have any promo code, enter it here:</p>
              <div className="cart-promocode-input">
                <input
                  type="text"
                  placeholder="Promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <button type="submit" onClick={handlePromoSubmit}>
                  Submit
                </button>
              </div>
              {!isPromoValid && (
                <p className="error-message" style={{ color: "red" }}>
                  Invalid promo code. Please try again.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default Cart;*/

/*<div className="cart-promocode">
          <div>
            <p> If you have any promocode enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Promo code" />
              <button type="submit">Submit</button>
            </div>
          </div>
        </div>*/
