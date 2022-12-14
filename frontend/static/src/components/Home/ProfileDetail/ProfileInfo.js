import { AiOutlineInstagram } from "react-icons/ai";
import { AiOutlineTwitter } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { handleError } from "../../../re-usable-func";
import Cookies from "js-cookie";
import HeadlinePost from "./HeadlinePost";
import Reviews from "./Reviews";
import CloseButton from "react-bootstrap/CloseButton";

function ProfileInfo({ state, userState, headlinePost, reviews, setReviews, id }) {
  const [newRequest, setNewRequest] = useState({
    text: "",
    trainerprofile: state.id,
  });
  const [show, setShow] = useState(false);

  const checkAllHeadline = () => {
    if (headlinePost.post_image1 || headlinePost.post_image2 || headlinePost.post_image3) {
      return true;
    }
    return false;
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setNewRequest((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setShow(false);
    setNewRequest({
      text: "",
      trainerprofile: state.id,
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
      body: JSON.stringify(newRequest),
    };
    const response = await fetch(`/api/v1/requests/trainer/${state.id}/`, options).catch(
      handleError
    );
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
      console.log(data);
      handleClose();
    }
  };

  const modal = (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header className="new-message-head">
        <Modal.Title>New Message</Modal.Title>
        <CloseButton variant="white" onClick={() => setShow(false)} />
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Label className="new-message-label">
            Reach out to inquire about working with {state.first_name}.
          </Form.Label>
          <textarea
            required
            placeholder="Message..."
            rows="2"
            className="form-control"
            name="text"
            value={newRequest.text}
            onChange={handleInput}
          />
        </Modal.Body>
        <Modal.Footer className="new-message-foot">
          <Button className="form-button" type="submit">
            Send
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );

  return (
    <section className="profile-info">
      <aside className="info-aside">
        {/* <section className="profile-aside-head"> */}
        {/* <div className="profile-image-container"> */}
        <img className="profile-image" src={state.avatar} alt="" />
        {/* </div> */}
        {/* </section> */}
        <section className="profile-aside-info">
          <h1 className="aside-name">
            {state.first_name} {state.last_name}
          </h1>
          <span className="certs">{state.certs}</span>
          <h4>Specialties</h4>
          <p className="mute-text">{state.specialties}</p>
          <h4>Contacts</h4>
          <p className="mute-text">{state.email}</p>
          {state.personal_site && (
            <div className="personal-site-container">
              <p className="personal-site">
                <a className="website-link" href={state.personal_site}>
                  My Website
                </a>
              </p>
            </div>
          )}
          <ul className="list social-ul">
            {state.instagram && (
              <li className="social-li">
                <a className="social-link" href={`https://www.instagram.com/${state.instagram}/`}>
                  <AiOutlineInstagram className="social-icon" />
                </a>
              </li>
            )}
            {state.twitter && (
              <li className="social-li">
                <a className="social-link" href={`https://www.twitter.com/${state.twitter}/`}>
                  <AiOutlineTwitter className="social-icon" />
                </a>
              </li>
            )}
            {state.facebook && (
              <li className="social-li">
                <a className="social-link" href={`https://www.facebook.com/${state.facebook}/`}>
                  <BsFacebook className="social-icon" />
                </a>
              </li>
            )}
          </ul>
          {modal}
          {userState.is_client && (
            <div className="aside-foot">
              <Button className="contact-button" onClick={() => setShow(true)}>
                Contact
              </Button>
            </div>
          )}
        </section>
      </aside>
      <article className="profile-main">
        {headlinePost && checkAllHeadline() && <HeadlinePost headlinePost={headlinePost} />}
        <section className="bio-info">
          <h2 className="section-title">About {state.first_name}</h2>
          <p>{state.bio}</p>
          <p>Business: {state.business}</p>
          <p>Location: {state.location}</p>
          <p>Offered training: {state.training_type}</p>
        </section>
        <section>
          {reviews && (
            <Reviews reviews={reviews} setReviews={setReviews} id={id} userState={userState} />
          )}
        </section>
      </article>
    </section>
  );
}

export default ProfileInfo;
