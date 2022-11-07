import "../../styles/TrainerPortal.css";
import Card from "react-bootstrap/Card";
import moment from "moment";
import Button from "react-bootstrap/Button";
import Cookies from "js-cookie";
import { handleError } from "../../re-usable-func";

function TrainerRequests({ userState, requests, setRequests }) {
  const deleteRequest = async (id) => {
    const response = await fetch(`/api/v1/requests/${id}/`, {
      method: "DELETE",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    });
    const index = requests.findIndex((request) => request.id === id);
    const updatedRequests = [...requests];
    updatedRequests.splice(index, 1);
    setRequests(updatedRequests);
  };

  const addToClientList = async (profile, id) => {
    const addedClient = {
      trainerprofile: userState.trainer_profile,
      clientprofile: profile,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(addedClient),
    };
    const response = await fetch(
      `/api/v1/clientlists/trainer/${userState.trainer_profile}/`,
      options
    ).catch(handleError);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
      console.log(data);
      deleteRequest(id);
    }
  };

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
                  <Button
                    variant="dark"
                    className="request-button"
                    onClick={() => deleteRequest(request.id)}
                  >
                    Remove
                  </Button>
                  <Button
                    variant="dark"
                    className="request-button"
                    onClick={() => addToClientList(request.client_profile, request.id)}
                  >
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
