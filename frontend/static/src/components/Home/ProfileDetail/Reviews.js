import Card from "react-bootstrap/Card";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import Cookies from "js-cookie";
import { handleError } from "../../../re-usable-func";
import CloseButton from "react-bootstrap/CloseButton";

function Reviews({ reviews, setReviews, id, userState }) {
  const [newReview, setNewReview] = useState({
    trainerprofile: id,
    text: "",
    rating: 0,
  });
  const [show, setShow] = useState(false);

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#FDB035",
    },
    "& .MuiRating-iconEmpty": {
      color: "#3071DF",
    },
  });

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
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(newReview),
    };
    const response = await fetch(`/api/v1/profiles/trainers/${id}/reviews/`, options).catch(
      handleError
    );
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
      setReviews([...reviews, data]);
      handleClose();
    }
  };

  return (
    <section className="reviews">
      <div className="reviews-head">
        <h2 className="reviews-title">Reviews</h2>
        {userState.is_client && (
          <Button className="form-button" onClick={() => setShow(true)}>
            New Review
          </Button>
        )}
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="new-review-head">
          <Modal.Title>New Review</Modal.Title>
          <CloseButton variant="white" onClick={() => handleClose()} />
        </Modal.Header>
        <Modal.Body>
          <StyledRating
            name="rating"
            value={newReview.rating}
            onChange={(e, newValue) => handleReview(newValue)}
          />
          <textarea
            required
            placeholder="Review..."
            rows="2"
            className="form-control"
            name="text"
            value={newReview.text}
            onChange={handleInput}
          />
        </Modal.Body>
        <Modal.Footer className="new-review-foot">
          <Button className="form-button" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      {reviews.map((review) => (
        <Card key={review.id} className="review-card">
          <Card.Body>
            <div className="review-title">
              <img className="review-img" src={review.author_avatar} alt="" />
              <Card.Title className="review-user">{review.username}</Card.Title>
            </div>
            <StyledRating className="rating" name="rating" value={review.rating} readOnly />
            <Card.Text className="review-text">{review.text}</Card.Text>
            <span className="review-date">{moment(review.created_on).fromNow()}</span>
          </Card.Body>
        </Card>
      ))}
    </section>
  );
}

export default Reviews;
