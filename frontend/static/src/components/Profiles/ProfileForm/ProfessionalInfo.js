import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function ProfessionalInfoForm({ state, handleInput, nextStep, lastStep }) {
  return (
    <>
      <div className="form-head">
        <h3 className="create-profile-title">Professional Information</h3>
      </div>
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
          type="button"
          variant="dark"
          onClick={() => nextStep()}
        >
          Next
        </Button>
      </div>
    </>
  );
}

export default ProfessionalInfoForm;
