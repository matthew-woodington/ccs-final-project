import Card from "react-bootstrap/Card";
import Rating from "@mui/material/Rating";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import moment from 'moment'
import Cookies from "js-cookie";
import {handleError} from '../../../re-usable-func';

function Reviews({ reviews, setReviews, id, userState }) {
  const [newReview, setNewReview] = useState({
    trainerprofile: id,
    text: "",
    rating: 0,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const formData = new FormData();

    // for (const key in newReview) {
    //   if (newReview[key]) {
    //     formData.append(key, newReview[key]);
    //   }
    // }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(newReview),
    };
    const response = await fetch(`/api/v1/profiles/trainers/${id}/reviews/`, options).catch(handleError);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
      setReviews([...reviews, data])
      handleClose()
    }
  };

  return (
    <section>
      <div className="reviews-head">
        <h3>Reviews</h3>
        {userState.is_client && (
          <Button variant="dark" onClick={() => setShow(true)}>
            New Review
          </Button>
        )}
      </div>

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
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      {reviews.map((review) => (
        <Card key={review.id}>
          <Card.Body>
            <div className="review-title">
              <img className="review-img" src={review.author_avatar} alt="" />
              <Card.Title className="review-user">{review.username}</Card.Title>
            </div>
            <Rating name="rating" value={review.rating} readOnly />
            <Card.Text>
              {review.text}
            </Card.Text>
            <span>{moment(review.created_on).fromNow()}</span>
          </Card.Body>
        </Card>
      ))}
    </section>
  );
}

export default Reviews;
