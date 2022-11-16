import "../../../styles/ProfileDetail.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { handleError } from "../../../re-usable-func";
import ProfileInfo from "./ProfileInfo";
import Reviews from "./Reviews";

function TrainerDetailView({ userState }) {
  const [state, setState] = useState();
  const [reviews, setReviews] = useState();
  const [headlinePost, setHeadlinePost] = useState();

  const { id } = useParams();

  useEffect(() => {
    const getProfile = async (id) => {
      const response = await fetch(`/api/v1/profiles/trainers/${id}/`).catch(handleError);
      if (!response.ok) {
        throw new Error("Network response was not ok!");
      }
      const data = await response.json();
      setState(data);
    };
    getProfile(id);
  }, []);

  useEffect(() => {
    const getReviews = async (id) => {
      const response = await fetch(`/api/v1/profiles/trainers/${id}/reviews/`).catch(handleError);
      if (!response.ok) {
        throw new Error("Network response was not ok!");
      }
      const data = await response.json();
      setReviews(data);
    };
    getReviews(id);
  }, []);

  useEffect(() => {
    const getHeadlinePost = async (id) => {
      const response = await fetch(`/api/v1/profiles/trainers/${id}/headlinepost/`).catch(
        handleError
      );
      if (!response.ok) {
        throw new Error("Network response was not ok!");
      }
      const data = await response.json();
      setHeadlinePost(data);
    };
    getHeadlinePost(id);
  }, []);

  return (
    <>
      <section className="profile-view">
        {state && (
          <ProfileInfo
            state={state}
            userState={userState}
            headlinePost={headlinePost}
            reviews={reviews}
            setReviews={setReviews}
            id={id}
          />
        )}
        {/* </section> */}
        {/* <section className="provile-view"> */}
        {/* {reviews && (
          <Reviews reviews={reviews} setReviews={setReviews} id={id} userState={userState} />
        )} */}
      </section>
    </>
  );
}

export default TrainerDetailView;
