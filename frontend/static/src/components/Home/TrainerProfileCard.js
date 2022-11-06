import "../../styles/Home.css";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";

function TrainerProfileCard({ profile }) {
  const navigate = useNavigate();

  return (
    <li>
      <Card className="profile-card" onClick={() => navigate(`/trainer/${profile.id}`)}>
        <div className="image-cont">
          <Card.Img className="profile-card-img" src={profile.avatar} />
        </div>
        <Card.Body>
          <Card.Title>
            {profile.first_name} {profile.last_name}
          </Card.Title>
          <span>{profile.training_type}</span>
          <Card.Text>{profile.specialties}</Card.Text>
          {/* <Link to={`/trainer/${profile.id}`}>View Profile</Link> */}
        </Card.Body>
      </Card>
    </li>
  );
}

export default TrainerProfileCard;
