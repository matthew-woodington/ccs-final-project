import "../../styles/404page.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <section className="error-container">
      <div className="error">
        <h1 className="error-title">404</h1>
        <h3 className="error-h3">Oops! This page could not be found.</h3>
        <p className="error-body">
          Sorry but the page you are looking for does not exist, has been removed, had a name
          change, or is temporarily unavailable.
        </p>
        <Button className="form-button" onClick={() => navigate("/")}>
          Back to Homepage
        </Button>
      </div>
    </section>
  );
}

export default ErrorPage;
