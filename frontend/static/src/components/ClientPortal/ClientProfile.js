import "../../styles/ClientProfile.css";
import { useState, useEffect } from "react";
import { handleError } from "../../re-usable-func";
import EditClient from "./EditClient";
import Button from "react-bootstrap/Button";

function ClientProfile({ userState, setUserState }) {
  const [myProfile, setMyProfile] = useState();
  const [isEdit, setIsEdit] = useState();

  useEffect(() => {
    const getMyProfile = async (id) => {
      const response = await fetch(`/api/v1/profiles/clients/${id}/`).catch(handleError);
      if (!response.ok) {
        throw new Error("Network response was not ok!");
      }
      const data = await response.json();
      setMyProfile(data);
    };

    getMyProfile(userState.client_profile);
  }, [userState]);

  const previewHTML = (
    <>
      {myProfile && (
        <section className="client-profile">
          <img className="client-my-profile-img" src={myProfile.avatar} alt="" />
          <div className="client-bio">
            {/* <h1>{myProfile.first_name}</h1> */}
            <h1 className="client-name">
              {myProfile.first_name} {myProfile.last_name}
            </h1>
            <Button type="button" className="edit-button" onClick={() => setIsEdit(true)}>
              Edit Profile Information
            </Button>
          </div>
        </section>
      )}
    </>
  );

  return (
    <section className="profile-view">
      {myProfile && isEdit ? (
        <EditClient
          myProfile={myProfile}
          setMyProfile={setMyProfile}
          setIsEdit={setIsEdit}
          userState={userState}
          setUserState={setUserState}
        />
      ) : (
        previewHTML
      )}
    </section>
  );
}

export default ClientProfile;
