import "../../styles/Home.css";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function TrainerProfileCard({ profile }) {
  return (
    <li>
      <Card className="profile-card">
        <div className="image-cont">
          <Card.Img className="profile-card-img" src={profile.avatar} />
        </div>
        <Card.Body>
          <Card.Title>
            {profile.first_name} {profile.last_name}
          </Card.Title>
          <span>{profile.training_type}</span>
          <Card.Text>{profile.specialties}</Card.Text>
          <Link to={`/trainer/${profile.id}`}>View Profile</Link>
        </Card.Body>
      </Card>
    </li>
  );
}

export default TrainerProfileCard;
