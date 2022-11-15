import "../../styles/ProfileDetail.css";
import { useState } from "react";
import { AiOutlineInstagram } from "react-icons/ai";
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
  const [isEdit, setIsEdit] = useState(false);
  const [editHeadline, setEditHeadline] = useState(false);

  const checkAllHeadline = () => {
    if (headlinePost.post_image1 || headlinePost.post_image2 || headlinePost.post_image3) {
      return true;
    }
    return false;
  };

  const previewHTML = (
    <section className="profile-info">
      <aside className="info-aside">
        {/* <div className="profile-aside-head"> */}
        <img className="profile-image" src={myProfile.avatar} alt="" />
        {/* </div> */}
        <section className="profile-aside-info">
          <h1 className="aside-name">
            {myProfile.first_name} {myProfile.last_name}
          </h1>
          <span className="certs">{myProfile.certs}</span>
          <div className="edit-buttons">
            <Button type="button" className="edit-button" onClick={() => setIsEdit(true)}>
              Edit Profile Information
            </Button>
            <Button type="button" className="edit-button" onClick={() => setEditHeadline(true)}>
              Edit Headline Post
            </Button>
          </div>
          <h4>Specialties:</h4>
          <p>{myProfile.specialties}</p>
          <h4>Contact me:</h4>
          <p>{myProfile.email}</p>
          <ul className="list social-ul">
            {myProfile.instagram && (
              <li className="social-li">
                <a
                  className="social-link"
                  href={`https://www.instagram.com/${myProfile.instagram}/`}
                >
                  <AiOutlineInstagram className="social-icon" />
                </a>
              </li>
            )}
            {myProfile.twitter && (
              <li className="social-li">
                <a className="social-link" href={`https://www.twitter.com/${myProfile.twitter}/`}>
                  <AiOutlineTwitter className="social-icon" />
                </a>
              </li>
            )}
            {myProfile.facebook && (
              <li className="social-li">
                <a className="social-link" href={`https://www.facebook.com/${myProfile.facebook}/`}>
                  <BsFacebook className="social-icon" />
                </a>
              </li>
            )}
          </ul>
          {myProfile.personal_site && <a href={myProfile.personal_site}>Personal Website</a>}
        </section>
      </aside>
      <article className="profile-main">
        {headlinePost && checkAllHeadline() && <HeadlinePost headlinePost={headlinePost} />}
        <section className="bio-info">
          <h2 className="section-title">About {myProfile.first_name}</h2>
          <p>{myProfile.bio}</p>
          <p>Business: {myProfile.business}</p>
          <p>Location: {myProfile.location}</p>
          <p>Offered training: {myProfile.training_type}</p>
        </section>
      </article>
    </section>
  );

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
