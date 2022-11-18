import "../../styles/TrainerPortal.css";
import Card from "react-bootstrap/Card";
import moment from "moment";
import Button from "react-bootstrap/Button";
import Cookies from "js-cookie";
import { handleError } from "../../re-usable-func";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { IoWarning } from "react-icons/io5";

function TrainerRequests({ userState, requests, setRequests, setClients, clients }) {
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState();

  const setActive = (id) => {
    const index = requests.findIndex((request) => request.id === id);
    setModalData(requests[index]);
    setShow(true);
  };

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
    setShow(false);
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
      setClients([...clients, data]);
      deleteRequest(id);
    }
  };

  return (
    <>
      <section className="portal-display-box">
        {requests && requests.length > 0 ? (
          requests.map((request) => (
            <Card key={request.id} className="request-card">
              <Card.Header className="request-head">
                <img className="client-profile-img" src={request.author_avatar} alt="" />
                {request.first_name} {request.last_name}
              </Card.Header>
              <Card.Body>
                <Card.Text className="request-body">{request.text}</Card.Text>
              </Card.Body>
              <Card.Footer className="request-footer">
                <div>{moment(request.created_on).calendar()}</div>
                <div className="request-action">
                  <Button className="request-button" onClick={() => setActive(request.id)}>
                    Remove
                  </Button>

                  {modalData && (
                    <Modal size="sm" show={show} onHide={() => setShow(false)}>
                      <Modal.Header className="confirm-head">
                        <Modal.Title>
                          <IoWarning className="confirm-icon" />
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body className="confirm-body">
                        <p className="confirm-text">Delete message?</p>
                        <div className="form-foot">
                          <Button
                            variant="dark"
                            className="form-button"
                            onClick={() => setShow(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="dark"
                            className="form-button"
                            onClick={() => deleteRequest(modalData.id)}
                          >
                            Confirm
                          </Button>
                        </div>
                      </Modal.Body>
                    </Modal>
                  )}

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
          <p className="no-data-label">Any messages you get will appear here.</p>
        )}
      </section>
    </>
  );
}

export default TrainerRequests;
