import "../../styles/ProfileDetail.css";
import { useState } from "react";
import { handleError } from "../../re-usable-func";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Cookies from "js-cookie";

function EditProfile({ userState, setUserState, myProfile, setIsEdit, setMyProfile }) {
  const [state, setState] = useState(myProfile);
  const [preview, setPreview] = useState(state.avatar);

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

    const user = { ...state };
    if (!(user.avatar instanceof File)) {
      delete user.avatar;
    }

    for (const key in user) {
      if (user[key]) {
        formData.append(key, user[key]);
      }
    }

    const options = {
      method: "PATCH",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };

    const response = await fetch(`/api/v1/profiles/trainers/${state.id}/`, options).catch(
      handleError
    );
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
      console.log(data);
      setUserState({
        ...userState,
        trainer_avatar: data.avatar,
      });
      setMyProfile(data);
      setIsEdit(false);
    }
  };

  return (
    <div className="form-display">
      <Form className="form-box" onSubmit={handleSubmit}>
        <div className="form-head">
          <h1 className="form-profile-title">Edit Profile</h1>
          <div className="image-container">
            <img className="form-image" src={preview} alt="" />
          </div>
        </div>
        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Choose a profile picture</Form.Label>
          <Form.Control type="file" name="avatar" onChange={handleImage} />
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

        <Form.Group className="mb-3" controlId="training-type">
          <Form.Label>Availablity</Form.Label>
          <Form.Select
            required
            name="training_type"
            placeholder="Select an Option"
            value={state.training_type}
            onChange={handleInput}
          >
            <option>Select an Option</option>
            <option value="In Person">In Person</option>
            <option value="Online">Online</option>
            <option value="In Person & Online">In Person & Online</option>
          </Form.Select>
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
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
            <Form.Control
              placeholder="Instagram username..."
              aria-label="Username"
              aria-describedby="basic-addon1"
              type="text"
              name="instagram"
              value={state.instagram}
              onChange={handleInput}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="twitter">
          <Form.Label>Twitter</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
            <Form.Control
              placeholder="Twitter username..."
              aria-label="Username"
              aria-describedby="basic-addon1"
              type="text"
              name="twitter"
              value={state.twitter}
              onChange={handleInput}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="facebook">
          <Form.Label>Facebook</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
            <Form.Control
              placeholder="Facebook username..."
              aria-label="Username"
              aria-describedby="basic-addon1"
              type="text"
              name="facebook"
              value={state.facebook}
              onChange={handleInput}
            />
          </InputGroup>
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

        <div className="form-footer">
          <Button className="form-button" type="submit" variant="dark">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default EditProfile;
