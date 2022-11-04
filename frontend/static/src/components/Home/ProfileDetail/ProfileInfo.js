import { AiFillInstagram } from "react-icons/ai";
import { AiOutlineTwitter } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";

function ProfileInfo({ state }) {
  return (
    <>
      <aside>
        <div className="profile-image-container">
          <img className="profile-image" src={state.avatar} alt="" />
        </div>
        <h1>
          {state.first_name} {state.last_name}
        </h1>
        <span>{state.certs}</span>
        <h4>Specialties:</h4>
        <p>{state.specialties}</p>
        <h4>Contact me:</h4>
        <p>{state.email}</p>
        <ul className="list">
          {state.instagram && (
            <li>
              <a href={`https://www.instagram.com/${state.instagram}/`}>
                <AiFillInstagram />
              </a>
            </li>
          )}
          {state.twitter && (
            <li>
              <a href={`https://www.twitter.com/${state.twitter}/`}>
                <AiOutlineTwitter />
              </a>
            </li>
          )}
          {state.facebook && (
            <li>
              <a href={`https://www.facebook.com/${state.facebook}/`}>
                <BsFacebook />
              </a>
            </li>
          )}
        </ul>
        {state.personal_site && <a href={state.personal_site}>Personal Website</a>}
      </aside>
      <article>
        <h2>About {state.first_name}</h2>
        <p>{state.bio}</p>
        <p>Business: {state.business}</p>
        <p>Location: {state.location}</p>
        <p>Offered training: {state.training_type}</p>
      </article>
    </>
  );
}

export default ProfileInfo;
