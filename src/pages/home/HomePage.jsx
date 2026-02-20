import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { ProductsGrid } from "./ProductsGrid";
import "./HomePage.css";

export function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);

  // async is made as another function becuase it returns a promise and useEffect cant return a promise
  useEffect(() => {
    // use effect can't return a promise
    const getHomeData = async () => {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    };

    // Call the new function
    getHomeData();
  }, []);

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />
      <title>Ecommerce Project</title>
      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}
