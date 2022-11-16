import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { handleError } from "../../re-usable-func";
import Cookies from "js-cookie";

function EditClient({ myProfile, setMyProfile, setIsEdit, userState, setUserState }) {
  const [state, setState] = useState(myProfile);
  const [preview, setPreview] = useState(state.avatar);

  const handleCancel = () => {
    setIsEdit(false);
    setState(myProfile);
  };

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

    const response = await fetch(`/api/v1/profiles/clients/${state.id}/`, options).catch(
      handleError
    );
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
      console.log(data);
      setUserState({
        ...userState,
        client_avatar: data.avatar,
      });
      setMyProfile(data);
      setIsEdit(false);
    }
  };

  return (
    <section className="form-display">
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
            placeholder="Last name..."
            type="text"
            name="last_name"
            value={state.last_name}
            onChange={handleInput}
          />
        </Form.Group>

        <div className="form-footer">
          <Button
            className="form-button split-bottom-button"
            type="button"
            variant="dark"
            onClick={() => handleCancel()}
          >
            Cancel
          </Button>
          <Button className="form-button split-bottom-button" type="submit" variant="dark">
            Save
          </Button>
        </div>
      </Form>
    </section>
  );
}

export default EditClient;
