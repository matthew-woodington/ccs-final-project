import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function TrainerProfileCreate() {
  const [state, setState] = useState({
    avatar: null,
    first_name: "",
    last_name: "",
    certs: "",
    specialties: "",
    bio: "",
    email: "",
    instagram: "",
    twitter: "",
    facebook: "",
    personal_site: "",
  });

  return (
    <>
      <Form>
        <h1>Create Profile</h1>
        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Choose a profile picture</Form.Label>
          <Form.Control required type="file" name="avatar" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="first-name">
          <Form.Label>First name</Form.Label>
          <Form.Control required placeholder="First name..." type="text" name="first_name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="last-name">
          <Form.Label>Last name</Form.Label>
          <Form.Control required placeholder="Last name..." type="text" name="last_name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="certs">
          <Form.Label>Enter all certifications</Form.Label>
          <Form.Control required placeholder="e.g. CSCS, NASM..." type="text" name="certs" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="specialties">
          <Form.Label>Enter training specializations</Form.Label>
          <Form.Control
            required
            placeholder="e.g. sports, weight loss, nutrition..."
            type="text"
            name="specialties"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Business address or loaction</Form.Label>
          <Form.Control
            required
            placeholder="e.g. street city, state and zip..."
            type="text"
            name="specialties"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="bio">
          <Form.Label>About you</Form.Label>
          <textarea required placeholder="Bio..." rows="3" className="form-control" name="bio" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Preferred email</Form.Label>
          <Form.Control required placeholder="email@example.com..." type="email" name="email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="instagram">
          <Form.Label>Instagram</Form.Label>
          <Form.Control placeholder="Instagram username..." type="text" name="instagram" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="twitter">
          <Form.Label>Twitter</Form.Label>
          <Form.Control placeholder="Twitter username..." type="url" name="twitter" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="facebook">
          <Form.Label>Facebook</Form.Label>
          <Form.Control placeholder="Facebook username..." type="url" name="facebook" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="personal-site">
          <Form.Label>Personal web-site</Form.Label>
          <Form.Control placeholder="https://www.yoursite.com..." type="url" name="personal_site" />
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
