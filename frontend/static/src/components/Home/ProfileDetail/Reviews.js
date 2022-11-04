import Card from "react-bootstrap/Card";
import Rating from "@mui/material/Rating";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Reviews({ reviews, setReviews, id }) {
  const [newReview, setNewReview] = useState({
    trainerprofile: id,
    text: "",
    rating: 1,
  });
  const [show, setShow] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setNewReview((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setShow(false);
    setNewReview({
      trainerprofile: id,
      text: "",
      rating: 0,
    });
  };

  const handleReview = (value) => {
    setNewReview({
      ...newReview,
      rating: value,
    });
  };

  return (
    <section>
      <Button variant="dark" onClick={() => setShow(true)}>
        New Review
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Rating
            name="rating"
            value={newReview.rating}
            onChange={(e, newValue) => handleReview(newValue)}
          />
          <textarea
            required
            placeholder="Review..."
            rows="3"
            className="form-control"
            name="text"
            value={newReview.text}
            onChange={handleInput}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      {reviews.map((review) => (
        <Card key={review.id}>
          <Card.Body>
            <Card.Title>{review.username}</Card.Title>
            <Card.Text>
              <Rating
                name="rating"
                value={review.rating}
                // onChange={(event, newValue) => {
                //   setValue(newValue);
                // }}
                readOnly
              />
              <span> {review.created_on}</span>
            </Card.Text>
            <Card.Text>{review.text}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </section>
  );
}

export default Reviews;
