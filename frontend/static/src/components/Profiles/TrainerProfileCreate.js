import "../../styles/Form.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { handleError } from "../../re-usable-func";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import defaultProfileImage from "../../Images/default-profile.jpg";

const INITIAL_TRAINER_PROFILE_STATE = {
  avatar: null,
  first_name: "",
  last_name: "",
  certs: "",
  specialties: "",
  business: "",
  location: "",
  bio: "",
  email: "",
  instagram: "",
  twitter: "",
  facebook: "",
  personal_site: "",
};

function TrainerProfileCreate() {
  const [state, setState] = useState(INITIAL_TRAINER_PROFILE_STATE);
  const [preview, setPreview] = useState(defaultProfileImage);

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setState({
      ...state,
      avatar: file,
    });

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("avatar", state.avatar);
    formData.append("first_name", state.first_name);
    formData.append("last_name", state.last_name);
    formData.append("certs", state.certs);
    formData.append("specialties", state.specialties);
    formData.append("business", state.business);
    formData.append("location", state.location);
    formData.append("bio", state.bio);
    formData.append("email", state.email);
    formData.append("instagram", state.instagram);
    formData.append("twitter", state.twitter);
    formData.append("facebook", state.facebook);
    formData.append("personal_site", state.personal_site);

    const options = {
      method: "POST",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };
    const response = await fetch("/api/v1/profiles/trainers/", options).catch(handleError);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
      console.log(data);
      setState(INITIAL_TRAINER_PROFILE_STATE);
      navigate("/");
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h1>Create Profile</h1>
        <div className="image-container">
          <img className="form-image" src={preview} alt="" />
          {/* {state.avatar && <img className="form-image" src={preview} alt="" />} */}
        </div>
        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Choose a profile picture</Form.Label>
          <Form.Control required type="file" name="avatar" onChange={handleImage} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="first-name">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            placeholder="First name..."
            type="text"
            name="first_name"
            value={state.first_name}
            onChange={handleInput}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="last-name">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            placeholder="Last name..."
            type="text"
            name="last_name"
            value={state.last_name}
            onChange={handleInput}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="certs">
          <Form.Label>Enter all certifications</Form.Label>
          <Form.Control
            required
            placeholder="e.g. CSCS, NASM..."
            type="text"
            name="certs"
            value={state.certs}
            onChange={handleInput}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="specialties">
          <Form.Label>Enter training specializations</Form.Label>
          <Form.Control
            required
            placeholder="e.g. sports, weight loss, nutrition..."
            type="text"
            name="specialties"
            value={state.specialties}
            onChange={handleInput}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Business affiliation or private</Form.Label>
          <Form.Control
            required
            placeholder="e.g. private OR company name..."
            type="text"
            name="business"
            value={state.business}
            onChange={handleInput}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Business address or loaction</Form.Label>
          <Form.Control
            required
            placeholder="e.g. street city, state and zip..."
            type="text"
            name="location"
            value={state.location}
            onChange={handleInput}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="bio">
          <Form.Label>About you</Form.Label>
          <textarea
            required
            placeholder="Bio..."
            rows="3"
            className="form-control"
            name="bio"
            value={state.bio}
            onChange={handleInput}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Preferred email</Form.Label>
          <Form.Control
            required
            placeholder="email@example.com..."
            type="email"
            name="email"
            value={state.email}
            onChange={handleInput}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="instagram">
          <Form.Label>Instagram</Form.Label>
          <Form.Control
            placeholder="Instagram username..."
            type="text"
            name="instagram"
            value={state.instagram}
            onChange={handleInput}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="twitter">
          <Form.Label>Twitter</Form.Label>
          <Form.Control
            placeholder="Twitter username..."
            type="url"
            name="twitter"
            value={state.twitter}
            onChange={handleInput}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="facebook">
          <Form.Label>Facebook</Form.Label>
          <Form.Control
            placeholder="Facebook username..."
            type="url"
            name="facebook"
            value={state.facebook}
            onChange={handleInput}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="personal-site">
          <Form.Label>Personal web-site</Form.Label>
          <Form.Control
            placeholder="https://www.yoursite.com..."
            type="url"
            name="personal_site"
            value={state.personal_site}
            onChange={handleInput}
          />
        </Form.Group>

        <div>
          <Button className="form-button" type="submit" variant="dark">
            Save
          </Button>
        </div>
      </Form>
    </>
  );
}

export default TrainerProfileCreate;
