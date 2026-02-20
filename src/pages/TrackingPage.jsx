import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import dayjs from "dayjs";
import { Header } from "../components/Header";
import "./TrackingPage.css";

export function TrackingPage({ cart }) {
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await axios.get(
        `/api/orders/${orderId}?expand=products`,
      );
      setOrder(response.data);
    };
    fetchOrder();
  }, [orderId]); // This will reload the order if orderId changes

  if (!order) {
    return null;
  }

  const selectedProduct = order.products.find((item) => {
    return item.productId === productId;
  });

  const { product, quantity, estimatedDeliveryTimeMs } = selectedProduct;

  const totalDeliveryTimeMs = estimatedDeliveryTimeMs - order.orderTimeMs;
  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;
  const deliveryPercent = Math.min(
    (timePassedMs / totalDeliveryTimeMs) * 100,
    100,
  );

  let isPreparing, isShipped, isDelivered;

  if (deliveryPercent < 33) {
    isPreparing = true;
  } else if (deliveryPercent >= 33 && deliveryPercent < 100) {
    isShipped = true;
  } else {
    isDelivered = true;
  }

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="tracking-favicon.png" />
      <title>Tracking</title>
      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <a className="back-to-orders-link link-primary" href="orders.html">
            View all orders
          </a>

          <div className="delivery-date">
            {deliveryPercent >= 100 ? "Delivered" : "Arrivng"} on{" "}
            {dayjs(estimatedDeliveryTimeMs).format("dddd, MMMM D")}
          </div>

          <div className="product-info">{product.name} </div>
          <div className="product-info">Quantity: {quantity}</div>

          <img className="product-image" src={product.image} />

          <div className="progress-labels-container">
            <div
              className={`progress-label ${isPreparing && "current-status"}`}
            >
              Preparing
            </div>
            <div className={`progress-label ${isShipped && "current-status"}`}>
              Shipped
            </div>
            <div
              className={`progress-label ${isDelivered && "current-status"}`}
            >
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${deliveryPercent}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
