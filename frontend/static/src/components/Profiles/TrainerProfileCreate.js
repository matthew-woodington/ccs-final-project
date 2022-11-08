import "../../styles/Form.css";
import { useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { handleError } from "../../re-usable-func";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import defaultProfileImage from "../../Images/default-profile.jpg";
import PersonalInfoForm from "./ProfileForm/Personalnfo";
import ProfessionalInfoForm from "./ProfileForm/ProfessionalInfo";
import SocialsForm from "./ProfileForm/Socials";

const INITIAL_TRAINER_PROFILE_STATE = {
  avatar: null,
  first_name: "",
  last_name: "",
  certs: "",
  specialties: "",
  training_type: "",
  business: "",
  location: "",
  bio: "",
  email: "",
  instagram: "",
  twitter: "",
  facebook: "",
  personal_site: "",
};

function TrainerProfileCreate({ userState, setUserState }) {
  const [state, setState] = useState(INITIAL_TRAINER_PROFILE_STATE);
  const [preview, setPreview] = useState(defaultProfileImage);
  const [step, setStep] = useState(1);

  const navigate = useNavigate();

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

    for (const key in state) {
      if (state[key]) {
        formData.append(key, state[key]);
      }
    }

    const options = {
      method: "POST",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };
    const response = await fetch("/api/v1/profiles/trainers/", options).catch(handleError);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
      console.log(data);
      setState(INITIAL_TRAINER_PROFILE_STATE);
      setUserState({
        ...userState,
        trainer_avatar: data.avatar,
        trainer_profile: data.id,
      });
      navigate("/");
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const lastStep = () => {
    setStep(step - 1);
  };

  const html = () => {
    switch (step) {
      case 1:
        return (
          <PersonalInfoForm
            state={state}
            preview={preview}
            handleInput={handleInput}
            handleImage={handleImage}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <ProfessionalInfoForm
            state={state}
            handleInput={handleInput}
            nextStep={nextStep}
            lastStep={lastStep}
          />
        );
      case 3:
        return (
          <SocialsForm
            state={state}
            handleInput={handleInput}
            handleSubmit={handleSubmit}
            lastStep={lastStep}
          />
        );
    }
  };

  return (
    <section className="form-display">
      <div className="form-box">
        <div className="form-head">
          <h1 className="trainer-create-title">Create Profile</h1>
        </div>
        <ProgressBar now={step * (100 / 3)} className="bar" />
        <div>{html()}</div>
      </div>
    </section>
  );
}

export default TrainerProfileCreate;
