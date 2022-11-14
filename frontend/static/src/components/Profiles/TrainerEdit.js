import "../../styles/ProfileDetail.css";
import { useState } from "react";
import { AiFillInstagram } from "react-icons/ai";
import { AiOutlineTwitter } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import HeadlinePost from "../Home/ProfileDetail/HeadlinePost";
import EditProfile from "./EditProfile";
import EditHeadline from "./EditHeadline";

function TrainerEdit({
  userState,
  setUserState,
  myProfile,
  setMyProfile,
  headlinePost,
  setHeadlinePost,
}) {
  // const [state, setState] = useState(myProfile);
  const [isEdit, setIsEdit] = useState(false);
  const [editHeadline, setEditHeadline] = useState(false);
  // const [preview, setPreview] = useState(state.avatar);
  // const [post, setPost] = useState(headlinePost);
  // const [postPreviewOne, setPostPreviewOne] = useState(headlinePost.post_image1);
  // const [postPreviewTwo, setPostPreviewTwo] = useState(headlinePost.post_image2);
  // const [postPreviewThree, setPostPreviewThree] = useState(headlinePost.post_image3);

  // const handleCancel = () => {
  //   setEditHeadline(false);
  //   setPost(headlinePost);
  // };

  // const clearSlideOne = () => {
  //   setPost({
  //     ...post,
  //     post_image1: "",
  //     post_title1: "",
  //     post_caption1: "",
  //   });
  // };

  // const clearSlideTwo = () => {
  //   setPost({
  //     ...post,
  //     post_image2: "",
  //     post_title2: "",
  //     post_caption2: "",
  //   });
  // };

  // const clearSlideThree = () => {
  //   setPost({
  //     ...post,
  //     post_image3: null,
  //     post_title3: null,
  //     post_caption3: null,
  //   });
  // };

  // const handleInput = (e) => {
  //   const { name, value } = e.target;
  //   setState((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  // const handleImage = (e) => {
  //   const file = e.target.files[0];
  //   setState({
  //     ...state,
  //     avatar: file,
  //   });

  //   const reader = new FileReader();

  //   reader.onloadend = () => {
  //     setPreview(reader.result);
  //   };
  //   reader.readAsDataURL(file);
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();

  //   const user = { ...state };
  //   if (!(user.avatar instanceof File)) {
  //     delete user.avatar;
  //   }

  //   for (const key in user) {
  //     if (user[key]) {
  //       formData.append(key, user[key]);
  //     }
  //   }

  //   const options = {
  //     method: "PATCH",
  //     headers: {
  //       "X-CSRFToken": Cookies.get("csrftoken"),
  //     },
  //     body: formData,
  //   };

  //   const response = await fetch(`/api/v1/profiles/trainers/${state.id}/`, options).catch(
  //     handleError
  //   );
  //   if (!response.ok) {
  //     throw new Error("Network response was not OK");
  //   } else {
  //     const data = await response.json();
  //     console.log(data);
  //     setUserState({
  //       ...userState,
  //       trainer_avatar: data.avatar,
  //     });
  //     setIsEdit(false);
  //   }
  // };

  // const handlePostInput = (e) => {
  //   const { name, value } = e.target;
  //   setPost((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  // const handlePostImage = (e) => {
  //   const file = e.target.files[0];
  //   setPost({
  //     ...state,
  //     [e.target.name]: file,
  //   });

  //   const reader = new FileReader();

  //   reader.onloadend = () => {
  //     if (e.target.name === "post_image1") {
  //       setPostPreviewOne(reader.result);
  //     } else if (e.target.name === "post_image2") {
  //       setPostPreviewTwo(reader.result);
  //     } else if (e.target.name === "post_image3") {
  //       setPostPreviewThree(reader.result);
  //     }
  //   };
  //   reader.readAsDataURL(file);
  // };

  // const handlePostSubmit = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();

  //   const editPost = { ...post };
  //   if (!(editPost.post_image1 instanceof File)) {
  //     delete editPost.post_image1;
  //   }
  //   if (!(editPost.post_image2 instanceof File)) {
  //     delete editPost.post_image2;
  //   }
  //   if (!(editPost.post_image3 instanceof File)) {
  //     delete editPost.post_image3;
  //   }

  //   for (const key in editPost) {
  //     if (editPost[key]) {
  //       formData.append(key, editPost[key]);
  //     }
  //   }

  //   const options = {
  //     method: "PUT",
  //     headers: {
  //       "X-CSRFToken": Cookies.get("csrftoken"),
  //     },
  //     body: formData,
  //   };

  //   const response = await fetch(
  //     `/api/v1/profiles/trainers/${userState.trainer_profile}/headlinepost/`,
  //     options
  //   ).catch(handleError);
  //   if (!response.ok) {
  //     throw new Error("Network response was not OK");
  //   } else {
  //     const data = await response.json();
  //     console.log(data);
  //     setHeadlinePost(data);
  //     setEditHeadline(false);
  //   }
  // };

  const previewHTML = (
    <>
      <aside>
        <div className="profile-image-container">
          <img className="profile-image" src={myProfile.avatar} alt="" />
        </div>
        <h1>
          {myProfile.first_name} {myProfile.last_name}
        </h1>
        <span>{myProfile.certs}</span>
        <h4>Specialties:</h4>
        <p>{myProfile.specialties}</p>
        <h4>Contact me:</h4>
        <p>{myProfile.email}</p>
        <ul className="list">
          {myProfile.instagram && (
            <li>
              <a href={`https://www.instagram.com/${myProfile.instagram}/`}>
                <AiFillInstagram />
              </a>
            </li>
          )}
          {myProfile.twitter && (
            <li>
              <a href={`https://www.twitter.com/${myProfile.twitter}/`}>
                <AiOutlineTwitter />
              </a>
            </li>
          )}
          {myProfile.facebook && (
            <li>
              <a href={`https://www.facebook.com/${myProfile.facebook}/`}>
                <BsFacebook />
              </a>
            </li>
          )}
        </ul>
        {myProfile.personal_site && <a href={myProfile.personal_site}>Personal Website</a>}
      </aside>
      <article>
        <Button type="button" variant="dark" onClick={() => setIsEdit(true)}>
          Edit Profile Information
        </Button>
        <Button type="button" variant="dark" onClick={() => setEditHeadline(true)}>
          Edit Headline Post
        </Button>
        <HeadlinePost headlinePost={headlinePost} />
        <h2>About {myProfile.first_name}</h2>
        <p>{myProfile.bio}</p>
        <p>Business: {myProfile.business}</p>
        <p>Location: {myProfile.location}</p>
        <p>Offered training: {myProfile.training_type}</p>
      </article>
    </>
  );

  // const editHTML = (
  //   <>
  //     <Form onSubmit={handleSubmit}>
  //       <h1>Edit Profile</h1>
  //       <div className="image-container">
  //         <img className="form-image" src={preview} alt="" />
  //         {/* {state.avatar && <img className="form-image" src={preview} alt="" />} */}
  //       </div>
  //       <Form.Group className="mb-3" controlId="image">
  //         <Form.Label>Choose a profile picture</Form.Label>
  //         <Form.Control type="file" name="avatar" onChange={handleImage} />
  //       </Form.Group>

  //       <Form.Group className="mb-3" controlId="first-name">
  //         <Form.Label>First name</Form.Label>
  //         <Form.Control
  //           required
  //           placeholder="First name..."
  //           type="text"
  //           name="first_name"
  //           value={state.first_name}
  //           onChange={handleInput}
  //         />
  //       </Form.Group>

  //       <Form.Group className="mb-3" controlId="last-name">
  //         <Form.Label>Last name</Form.Label>
  //         <Form.Control
  //           required
  //           placeholder="Last name..."
  //           type="text"
  //           name="last_name"
  //           value={state.last_name}
  //           onChange={handleInput}
  //         />
  //       </Form.Group>

  //       <Form.Group className="mb-3" controlId="certs">
  //         <Form.Label>Enter all certifications</Form.Label>
  //         <Form.Control
  //           required
  //           placeholder="e.g. CSCS, NASM..."
  //           type="text"
  //           name="certs"
  //           value={state.certs}
  //           onChange={handleInput}
  //         />
  //       </Form.Group>

  //       <Form.Group className="mb-3" controlId="specialties">
  //         <Form.Label>Enter training specializations</Form.Label>
  //         <Form.Control
  //           required
  //           placeholder="e.g. sports, weight loss, nutrition..."
  //           type="text"
  //           name="specialties"
  //           value={state.specialties}
  //           onChange={handleInput}
  //         />
  //       </Form.Group>

  //       <Form.Group className="mb-3" controlId="training-type">
  //         <Form.Label>Availablity</Form.Label>
  //         <Form.Select
  //           required
  //           name="training_type"
  //           placeholder="Select an Option"
  //           value={state.training_type}
  //           onChange={handleInput}
  //         >
  //           <option>Select an Option</option>
  //           <option value="In Person">In Person</option>
  //           <option value="Online">Online</option>
  //           <option value="In Person & Online">In Person & Online</option>
  //         </Form.Select>
  //       </Form.Group>

  //       <Form.Group>
  //         <Form.Label>Business affiliation or private</Form.Label>
  //         <Form.Control
  //           required
  //           placeholder="e.g. private OR company name..."
  //           type="text"
  //           name="business"
  //           value={state.business}
  //           onChange={handleInput}
  //         />
  //       </Form.Group>

  //       <Form.Group>
  //         <Form.Label>Business address or loaction</Form.Label>
  //         <Form.Control
  //           required
  //           placeholder="e.g. street city, state and zip..."
  //           type="text"
  //           name="location"
  //           value={state.location}
  //           onChange={handleInput}
  //         />
  //       </Form.Group>

  //       <Form.Group className="mb-3" controlId="bio">
  //         <Form.Label>About you</Form.Label>
  //         <textarea
  //           required
  //           placeholder="Bio..."
  //           rows="3"
  //           className="form-control"
  //           name="bio"
  //           value={state.bio}
  //           onChange={handleInput}
  //         />
  //       </Form.Group>

  //       <Form.Group className="mb-3" controlId="email">
  //         <Form.Label>Preferred email</Form.Label>
  //         <Form.Control
  //           required
  //           placeholder="email@example.com..."
  //           type="email"
  //           name="email"
  //           value={state.email}
  //           onChange={handleInput}
  //         />
  //       </Form.Group>

  //       <Form.Group className="mb-3" controlId="instagram">
  //         <Form.Label>Instagram</Form.Label>
  //         <InputGroup className="mb-3">
  //           <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
  //           <Form.Control
  //             placeholder="Instagram username..."
  //             aria-label="Username"
  //             aria-describedby="basic-addon1"
  //             type="text"
  //             name="instagram"
  //             value={state.instagram}
  //             onChange={handleInput}
  //           />
  //         </InputGroup>
  //       </Form.Group>

  //       <Form.Group className="mb-3" controlId="twitter">
  //         <Form.Label>Twitter</Form.Label>
  //         <InputGroup className="mb-3">
  //           <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
  //           <Form.Control
  //             placeholder="Twitter username..."
  //             aria-label="Username"
  //             aria-describedby="basic-addon1"
  //             type="text"
  //             name="twitter"
  //             value={state.twitter}
  //             onChange={handleInput}
  //           />
  //         </InputGroup>
  //       </Form.Group>

  //       <Form.Group className="mb-3" controlId="facebook">
  //         <Form.Label>Facebook</Form.Label>
  //         <InputGroup className="mb-3">
  //           <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
  //           <Form.Control
  //             placeholder="Facebook username..."
  //             aria-label="Username"
  //             aria-describedby="basic-addon1"
  //             type="text"
  //             name="facebook"
  //             value={state.facebook}
  //             onChange={handleInput}
  //           />
  //         </InputGroup>
  //       </Form.Group>

  //       <Form.Group className="mb-3" controlId="personal-site">
  //         <Form.Label>Personal web-site</Form.Label>
  //         <Form.Control
  //           placeholder="https://www.yoursite.com..."
  //           type="url"
  //           name="personal_site"
  //           value={state.personal_site}
  //           onChange={handleInput}
  //         />
  //       </Form.Group>

  //       <div>
  //         <Button className="form-button" type="submit" variant="dark">
  //           Save
  //         </Button>
  //       </div>
  //     </Form>
  //   </>
  // );

  // const editHeadlineHTML = (
  //   <>
  //     <Form onSubmit={handlePostSubmit}>
  //       <h1>Edit Headline Post</h1>
  //       <h3>Slide One</h3>
  //       <div className="image-container">
  //         <img className="form-image" src={postPreviewOne} alt="" />
  //       </div>
  //       <Form.Group className="mb-3" controlId="post_image1">
  //         <Form.Label>Choose a picture for slide one</Form.Label>
  //         <Form.Control type="file" name="post_image1" onChange={(e) => handlePostImage(e)} />
  //       </Form.Group>

  //       <Form.Group className="mb-3" controlId="post_title1">
  //         <Form.Label>Slide one title</Form.Label>
  //         <Form.Control
  //           placeholder="Title..."
  //           type="text"
  //           name="post_title1"
  //           value={post.post_title1}
  //           onChange={handlePostInput}
  //         />
  //       </Form.Group>

  //       <Form.Group className="mb-3" controlId="post_caption1">
  //         <Form.Label>Slide one caption</Form.Label>
  //         <Form.Control
  //           placeholder="Caption..."
  //           type="text"
  //           name="post_caption1"
  //           value={post.post_caption1}
  //           onChange={handlePostInput}
  //         />
  //       </Form.Group>
  //       <Button
  //         className="form-button"
  //         type="button"
  //         variant="dark"
  //         onClick={() => clearSlideOne()}
  //       >
  //         Clear Slide One
  //       </Button>

  //       <h3>Slide Two</h3>
  //       <div className="image-container">
  //         <img className="form-image" src={postPreviewTwo} alt="" />
  //       </div>
  //       <Form.Group className="mb-3" controlId="post_image2">
  //         <Form.Label>Choose a picture for slide two</Form.Label>
  //         <Form.Control type="file" name="post_image2" onChange={(e) => handlePostImage(e)} />
  //       </Form.Group>

  //       <Form.Group className="mb-3" controlId="post_title2">
  //         <Form.Label>Slide one title</Form.Label>
  //         <Form.Control
  //           placeholder="Title..."
  //           type="text"
  //           name="post_title2"
  //           value={post.post_title2}
  //           onChange={handlePostInput}
  //         />
  //       </Form.Group>

  //       <Form.Group className="mb-3" controlId="post_caption2">
  //         <Form.Label>Slide two caption</Form.Label>
  //         <Form.Control
  //           placeholder="Caption..."
  //           type="text"
  //           name="post_caption2"
  //           value={post.post_caption2}
  //           onChange={handlePostInput}
  //         />
  //       </Form.Group>
  //       <Button
  //         className="form-button"
  //         type="button"
  //         variant="dark"
  //         onClick={() => clearSlideTwo()}
  //       >
  //         Clear Slide Two
  //       </Button>

  //       <h3>Slide Three</h3>
  //       <div className="image-container">
  //         <img className="form-image" src={postPreviewThree} alt="" />
  //       </div>
  //       <Form.Group className="mb-3" controlId="post_image3">
  //         <Form.Label>Choose a picture for slide three</Form.Label>
  //         <Form.Control type="file" name="post_image3" onChange={(e) => handlePostImage(e)} />
  //       </Form.Group>

  //       <Form.Group className="mb-3" controlId="post_title3">
  //         <Form.Label>Slide three title</Form.Label>
  //         <Form.Control
  //           placeholder="Title..."
  //           type="text"
  //           name="post_title3"
  //           value={post.post_title3}
  //           onChange={handlePostInput}
  //         />
  //       </Form.Group>

  //       <Form.Group className="mb-3" controlId="post_caption3">
  //         <Form.Label>Slide three caption</Form.Label>
  //         <Form.Control
  //           placeholder="Caption..."
  //           type="text"
  //           name="post_caption3"
  //           value={post.post_caption3}
  //           onChange={handlePostInput}
  //         />
  //       </Form.Group>
  //       <Button
  //         className="form-button"
  //         type="button"
  //         variant="dark"
  //         onClick={() => clearSlideThree()}
  //       >
  //         Clear Slide Three
  //       </Button>

  //       <Button className="form-button" type="button" variant="dark" onClick={() => handleCancel()}>
  //         Cancel
  //       </Button>
  //       <Button className="form-button" type="submit" variant="dark">
  //         Save
  //       </Button>
  //     </Form>
  //   </>
  // );

  return (
    <>
      {myProfile && headlinePost && (
        <>
          {isEdit ? (
            <EditProfile
              setMyProfile={setMyProfile}
              setIsEdit={setIsEdit}
              userState={userState}
              setUserState={setUserState}
              myProfile={myProfile}
            />
          ) : editHeadline ? (
            <EditHeadline
              userState={userState}
              headlinePost={headlinePost}
              setHeadlinePost={setHeadlinePost}
              setEditHeadline={setEditHeadline}
            />
          ) : (
            previewHTML
          )}
        </>
      )}
    </>
  );
}

export default TrainerEdit;
