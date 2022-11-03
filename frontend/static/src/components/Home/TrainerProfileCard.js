import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function TrainerProfileCard({ profile }) {
  return (
    <li>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={profile.avatar} />
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
