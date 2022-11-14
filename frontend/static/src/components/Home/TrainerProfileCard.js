import "../../styles/Home.css";
import { useState } from "react";
import Card from "react-bootstrap/Card";
import CloseButton from "react-bootstrap/CloseButton";
import { useNavigate } from "react-router-dom";
import { handleError } from "../../re-usable-func";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import Rating from "@mui/material/Rating";
import moment from "moment";
import { MdReviews } from "react-icons/md";

function TrainerProfileCard({ profile }) {
  const [show, setShow] = useState(false);
  const [cardReviews, setCardReviews] = useState();

  const handleClose = (e) => {
    e.stopPropagation();
    setShow(false);
  };

  const handleShow = (e, id) => {
    e.stopPropagation();
    getReviews(id);
    setShow(true);
  };

  const navigate = useNavigate();

  const getReviews = async (id) => {
    const response = await fetch(`/api/v1/profiles/trainers/${id}/reviews/`).catch(handleError);
    if (!response.ok) {
      throw new Error("Network response was not ok!");
    }
    const data = await response.json();
    setCardReviews(data);
  };

  const modal = (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{profile.first_name}'s Reviews</Modal.Title>
          <CloseButton onClick={(e) => handleClose(e)} />
        </Modal.Header>
        <Modal.Body className="card-review-modal-body">
          {!cardReviews ? (
            <p>No reviews submitted for this trainer.</p>
          ) : cardReviews === null ? (
            <Spinner animation="border" variant="warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : cardReviews.length === 0 ? (
            <p>No reviews submitted for this trainer.</p>
          ) : (
            cardReviews.map((review) => (
              <Card key={review.id}>
                <Card.Body>
                  <div className="review-title">
                    <img className="review-img" src={review.author_avatar} alt="" />
                    <Card.Title className="review-user">{review.username}</Card.Title>
                  </div>
                  <Rating name="rating" value={review.rating} readOnly />
                  <Card.Text>{review.text}</Card.Text>
                  <span>{moment(review.created_on).fromNow()}</span>
                </Card.Body>
              </Card>
            ))
          )}
        </Modal.Body>
      </Modal>
    </>
  );

  return (
    <li>
      <Card className="profile-card" onClick={() => navigate(`/trainer/${profile.id}`)}>
        <div className="image-cont">
          <Card.Img className="profile-card-img" src={profile.avatar} />
        </div>
        <Card.Body>
          <Card.Title className="card-title">
            {profile.first_name} {profile.last_name}
            <Button className="form-button" onClick={(e) => handleShow(e, profile.id)}>
              <MdReviews />
            </Button>
            {modal}
          </Card.Title>
          <span>{profile.training_type}</span>
          <Card.Text>{profile.specialties}</Card.Text>
          <Card.Text>{profile.location}</Card.Text>
        </Card.Body>
      </Card>
    </li>
  );
}

export default TrainerProfileCard;
