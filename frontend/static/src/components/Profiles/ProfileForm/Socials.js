import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

function SocialsForm({ state, handleInput, lastStep, handleSubmit }) {
  return (
    <>
      <div className="form-head">
        <h3 className="create-profile-title">Contact Information</h3>
      </div>
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
        <Button
          className="form-button split-bottom-button"
          type="button"
          variant="dark"
          onClick={() => lastStep()}
        >
          Back
        </Button>
        <Button
          className="form-button split-bottom-button"
          type="submit"
          variant="dark"
          onClick={(e) => handleSubmit(e)}
        >
          Save & Submit
        </Button>
      </div>
    </>
  );
}

export default SocialsForm;
