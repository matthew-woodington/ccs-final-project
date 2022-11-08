import "../../styles/Home.css";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

function TrainerProfileCard({ profile }) {
  const navigate = useNavigate();

  return (
    <li>
      <Card className="profile-card" onClick={() => navigate(`/trainer/${profile.id}`)}>
        <div className="image-cont">
          <Card.Img className="profile-card-img" src={profile.avatar} />
        </div>
        <Card.Body>
          <Card.Title className="card-title">
            {profile.first_name} {profile.last_name}
          </Card.Title>
          <span>{profile.training_type}</span>
          <Card.Text>{profile.specialties}</Card.Text>
          <Card.Text>{profile.location}</Card.Text>
        </Card.Body>
      </Card>
    </li>
  );
}

export default TrainerProfileCard;
