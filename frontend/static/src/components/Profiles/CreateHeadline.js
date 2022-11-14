import "../../styles/Form.css";
import { useState } from "react";
import { handleError } from "../../re-usable-func";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Cookies from "js-cookie";
import noImage from "../../Images/no-photo.webp";
import { useNavigate } from "react-router-dom";

function CreateHeadline({ userState }) {
  const [post, setPost] = useState({
    trainerprofile: userState.trainer_profile,
    post_image1: null,
    post_image2: null,
    post_image3: null,
    post_title1: null,
    post_title2: null,
    post_title3: null,
    post_caption1: null,
    post_caption2: null,
    post_caption3: null,
  });
  const [postPreviewOne, setPostPreviewOne] = useState(noImage);
  const [postPreviewTwo, setPostPreviewTwo] = useState(noImage);
  const [postPreviewThree, setPostPreviewThree] = useState(noImage);

  const navigate = useNavigate();

  const handlePostInput = (e) => {
    const { name, value } = e.target;
    setPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePostImage = (e) => {
    const file = e.target.files[0];
    setPost({
      ...post,
      [e.target.name]: file,
    });

    const reader = new FileReader();

    reader.onloadend = () => {
      if (e.target.name === "post_image1") {
        setPostPreviewOne(reader.result);
      } else if (e.target.name === "post_image2") {
        setPostPreviewTwo(reader.result);
      } else if (e.target.name === "post_image3") {
        setPostPreviewThree(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    const editPost = { ...post };
    if (!(editPost.post_image1 instanceof File)) {
      delete editPost.post_image1;
    }
    if (!(editPost.post_image2 instanceof File)) {
      delete editPost.post_image2;
    }
    if (!(editPost.post_image3 instanceof File)) {
      delete editPost.post_image3;
    }

    for (const key in editPost) {
      if (editPost[key]) {
        formData.append(key, editPost[key]);
      }
    }

    const options = {
      method: "POST",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };

    const response = await fetch(`/api/v1/profiles/trainers/headlineposts/`, options).catch(
      handleError
    );
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
      console.log(data);
    }
    navigate("/");
  };
  return (
    <section className="form-display">
      <div className="form-box">
        <Form onSubmit={handlePostSubmit}>
          <h1>Create Headline Post</h1>
          <p>
            Add up to three posts to be seen at the top of your profile page or{" "}
            <span className="skip-link" onClick={(e) => handlePostSubmit(e)}>
              skip for now
            </span>{" "}
            and edit later.
          </p>
          <h3>Slide One</h3>
          <div className="headline-preview">
            <img className="headline-image" src={postPreviewOne} alt="" />
          </div>
          <Form.Group className="mb-3" controlId="post_image1">
            <Form.Label>Choose a picture for slide one</Form.Label>
            <Form.Control type="file" name="post_image1" onChange={(e) => handlePostImage(e)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="post_title1">
            <Form.Label>Slide one title</Form.Label>
            <Form.Control
              placeholder="Title..."
              type="text"
              name="post_title1"
              value={post.post_title1}
              onChange={handlePostInput}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="post_caption1">
            <Form.Label>Slide one caption</Form.Label>
            <Form.Control
              placeholder="Caption..."
              type="text"
              name="post_caption1"
              value={post.post_caption1}
              onChange={handlePostInput}
            />
          </Form.Group>

          <h3>Slide Two</h3>
          <div className="headline-preview">
            <img className="headline-image" src={postPreviewTwo} alt="" />
          </div>
          <Form.Group className="mb-3" controlId="post_image2">
            <Form.Label>Choose a picture for slide two</Form.Label>
            <Form.Control type="file" name="post_image2" onChange={(e) => handlePostImage(e)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="post_title2">
            <Form.Label>Slide one title</Form.Label>
            <Form.Control
              placeholder="Title..."
              type="text"
              name="post_title2"
              value={post.post_title2}
              onChange={handlePostInput}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="post_caption2">
            <Form.Label>Slide two caption</Form.Label>
            <Form.Control
              placeholder="Caption..."
              type="text"
              name="post_caption2"
              headline
              value={post.post_caption2}
              onChange={handlePostInput}
            />
          </Form.Group>

          <h3>Slide Three</h3>
          <div className="headline-preview">
            <img className="headline-image" src={postPreviewThree} alt="" />
          </div>
          <Form.Group className="mb-3" controlId="post_image3">
            <Form.Label>Choose a picture for slide three</Form.Label>
            <Form.Control type="file" name="post_image3" onChange={(e) => handlePostImage(e)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="post_title3">
            <Form.Label>Slide three title</Form.Label>
            <Form.Control
              placeholder="Title..."
              type="text"
              name="post_title3"
              value={post.post_title3}
              onChange={handlePostInput}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="post_caption3">
            <Form.Label>Slide three caption</Form.Label>
            <Form.Control
              placeholder="Caption..."
              type="text"
              name="post_caption3"
              value={post.post_caption3}
              onChange={handlePostInput}
            />
          </Form.Group>

          <Button className="form-button" type="submit">
            Save & Submit
          </Button>
        </Form>
      </div>
    </section>
  );
}

export default CreateHeadline;
