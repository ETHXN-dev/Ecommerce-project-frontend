import { Header } from "../components/Header";
import { Link } from "react-router";
import "./NotFound.css";

export function NotFound() {
  return (
    <>
      <Header />
      <div class="error-container">
        <h1>404</h1>
        <p>Oops! The page you're looking for isn't here.</p>
        <Link to="/">Go Back to Home</Link>
      </div>
    </>
  );
}
