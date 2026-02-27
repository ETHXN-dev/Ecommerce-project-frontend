import axios from "axios";
import { formatMoney } from "../../utils/money";
import { useState } from "react";

export function CartItemDetails({ cartItem, loadCart }) {
  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };

  const [isUpdating, setisUpdating] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const updateQuantity = async () => {
    if (isUpdating) {
      await axios.put(`/api/cart-items/${cartItem.productId}`, { quantity });
      await loadCart();
      setisUpdating(false);
    } else setisUpdating(true);
  };

  const getQuantity = (event) => {
    setQuantity(Number(event.target.value));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      updateQuantity();
    } else if (event.key === "Escape") {
      setisUpdating(false);
    }
  };

  return (
    <>
      <img className="product-image" src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          ${formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:{" "}
            {isUpdating && (
              <input
                type="text"
                className="textbox"
                style={{ width: 50 }}
                onChange={getQuantity}
                onKeyDown={handleKeyDown}
                // value={quantity}
              />
            )}
            {!isUpdating && (
              <span className="quantity-label">{cartItem.quantity}</span>
            )}
          </span>
          <span
            className="update-quantity-link link-primary"
            onClick={updateQuantity}
          >
            Update
          </span>
          <span
            className="delete-quantity-link link-primary"
            onClick={deleteCartItem}
          >
            Delete
          </span>
        </div>
      </div>
    </>
  );
}
