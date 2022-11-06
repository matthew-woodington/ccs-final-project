import "../../styles/Requests.css";
import Card from "react-bootstrap/Card";
import moment from "moment";
import Button from "react-bootstrap/Button";

function TrainerRequests({ requests }) {
  return (
    <>
      <div>
        {requests ? (
          requests.map((request) => (
            <Card key={request.id}>
              <Card.Header className="request-head">
                <img className="client-profile-img" src={request.author_avatar} alt="" />
                {request.first_name} {request.last_name}
              </Card.Header>
              <Card.Body>
                <Card.Text>{request.text}</Card.Text>
              </Card.Body>
              <Card.Footer className="request-footer">
                <div>{moment(request.created_on).calendar()}</div>
                <div className="request-action">
                  <Button variant="dark" className="request-button">
                    Remove
                  </Button>
                  <Button variant="dark" className="request-button">
                    Add Client
                  </Button>
                </div>
              </Card.Footer>
            </Card>
          ))
        ) : (
          <p>Any messages you get will appear here.</p>
        )}
      </div>
    </>
  );
}

export default TrainerRequests;
