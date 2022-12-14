import { useState, useEffect } from "react";
import { handleError } from "../../re-usable-func";
import TrainerEdit from "./TrainerEdit";

function TrainerMyProfile({ userState, setUserState }) {
  const [myProfile, setMyProfile] = useState();
  const [headlinePost, setHeadlinePost] = useState();

  useEffect(() => {
    const getMyProfile = async (id) => {
      const response = await fetch(`/api/v1/profiles/trainers/${id}/`).catch(handleError);
      if (!response.ok) {
        throw new Error("Network response was not ok!");
      }
      const data = await response.json();
      setMyProfile(data);
    };

    getMyProfile(userState.trainer_profile);
  }, [userState]);

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
    getHeadlinePost(userState.trainer_profile);
  }, [userState]);

  return (
    <section className="profile-view">
      {myProfile && (
        <TrainerEdit
          userState={userState}
          setUserState={setUserState}
          myProfile={myProfile}
          setMyProfile={setMyProfile}
          headlinePost={headlinePost}
          setHeadlinePost={setHeadlinePost}
        />
      )}
    </section>
  );
}

export default TrainerMyProfile;
