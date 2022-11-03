import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function PersonalInfoForm({ state, preview, handleImage, handleInput, nextStep }) {
  return (
    <>
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
      <Button className="form-button" type="button" variant="dark" onClick={() => nextStep()}>
        Next
      </Button>
    </>
  );
}

export default PersonalInfoForm;