import "../../styles/ProfileDetail.css";
import { useState } from "react";
import { handleError } from "../../re-usable-func";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Cookies from "js-cookie";
import noImage from "../../Images/no-photo.webp";

function EditHeadline({ userState, setEditHeadline, headlinePost, setHeadlinePost }) {
  const [post, setPost] = useState(headlinePost);
  const [postPreviewOne, setPostPreviewOne] = useState(headlinePost.post_image1 || noImage);
  const [postPreviewTwo, setPostPreviewTwo] = useState(headlinePost.post_image2 || noImage);
  const [postPreviewThree, setPostPreviewThree] = useState(headlinePost.post_image3 || noImage);

  const handleCancel = () => {
    setEditHeadline(false);
    setPost(headlinePost);
  };

  const clearSlideOne = () => {
    setPost({
      ...post,
      post_image1: "",
      post_title1: "",
      post_caption1: "",
    });
  };

  const clearSlideTwo = () => {
    setPost({
      ...post,
      post_image2: "",
      post_title2: "",
      post_caption2: "",
    });
  };

  const clearSlideThree = () => {
    setPost({
      ...post,
      post_image3: "",
      post_title3: "",
      post_caption3: "",
    });
  };

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
    if (editPost.post_image1 === headlinePost.post_image1) {
      delete editPost.post_image1;
    }
    if (editPost.post_image2 === headlinePost.post_image2) {
      delete editPost.post_image2;
    }
    if (editPost.post_image3 === headlinePost.post_image3) {
      delete editPost.post_image3;
    }

    // for (const key in editPost) {
    //   if (editPost[key]) {
    //     formData.append(key, editPost[key]);
    //   }
    // }

    for (const key in editPost) {
      formData.append(key, editPost[key]);
    }

    const options = {
      method: "PUT",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };

    const response = await fetch(
      `/api/v1/profiles/trainers/${userState.trainer_profile}/headlinepost/`,
      options
    ).catch(handleError);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
      console.log(data);
      setHeadlinePost(data);
      setEditHeadline(false);
    }
  };

  return (
    <section className="form-display">
      <div className="form-box">
        <Form onSubmit={handlePostSubmit}>
          <div className="form-head">
            <h1 className="form-profile-title">Edit Headline Post</h1>
          </div>
          <section className="slide-box">
            <div className="slide-box-head">
              <h3 className="headline-slide-title">Slide One</h3>
              <div className="headline-preview">
                <img className="headline-image" src={postPreviewOne} alt="" />
              </div>
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
            <div className="headline-slide-clear">
              <Button
                className="clear-button bottom-button"
                type="button"
                variant="dark"
                onClick={() => clearSlideOne()}
              >
                Clear Slide One
              </Button>
            </div>
          </section>

          <section className="slide-box">
            <div className="slide-box-head">
              <h3 className="headline-slide-title">Slide Two</h3>
              <div className="headline-preview">
                <img className="headline-image" src={postPreviewTwo} alt="" />
              </div>
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
                value={post.post_caption2}
                onChange={handlePostInput}
              />
            </Form.Group>
            <div className="headline-slide-clear">
              <Button
                className="clear-button bottom-button"
                type="button"
                variant="dark"
                onClick={() => clearSlideTwo()}
              >
                Clear Slide Two
              </Button>
            </div>
          </section>

          <section className="slide-box">
            <div className="slide-box-head">
              <h3 className="headline-slide-title">Slide Three</h3>
              <div className="headline-preview">
                <img className="headline-image" src={postPreviewThree} alt="" />
              </div>
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
            <div className="headline-slide-clear">
              <Button
                className="clear-button bottom-button"
                type="button"
                variant="dark"
                onClick={() => clearSlideThree()}
              >
                Clear Slide Three
              </Button>
            </div>
          </section>

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
      </div>
    </section>
  );
}

export default EditHeadline;
