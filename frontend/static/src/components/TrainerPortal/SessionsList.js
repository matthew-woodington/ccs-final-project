import Card from "react-bootstrap/Card";
import { FiEdit } from "react-icons/fi";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Cookies from "js-cookie";
import { handleError } from "../../re-usable-func";
import moment from "moment";

function SessionsList({ sessions, setSessions }) {
  const [modalData, setModalData] = useState({
    client_details: {},
    trainer_profile: "",
    clientprofile: "",
    date: "",
    time: "",
    details: "",
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setModalData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const setActive = (id) => {
    const index = sessions.findIndex((session) => session.id === id);
    setModalData(sessions[index]);
    setShow(true);
  };

  const editSession = async () => {
    const editedSession = {
      date: modalData.date,
      time: modalData.time,
      details: modalData.details,
    };

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(editedSession),
    };
    const response = await fetch(`/api/v1/sessions/${modalData.id}/`, options).catch(handleError);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
      const index = sessions.findIndex((session) => session.id === data.id);
      const updatedSessions = [...sessions];
      updatedSessions.splice(index, 1, data);
      setSessions(updatedSessions);
      setShow(false);
    }
  };

  return (
    <>
      {sessions.length > 0 ? (
        sessions.map((session) => (
          <Card key={session.id}>
            <Card.Header className="session-head">
              <div className="client-info">
                <img className="client-profile-img" src={session.client_details.avatar} />
                {session.client_details.first_name} {session.client_details.last_name}
              </div>
              <div>
                <FiEdit className="session-action" onClick={() => setActive(session.id)} />

                {modalData && (
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>
                        Edit {modalData.client_details.first_name}'s Session
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form.Control
                        required
                        type="date"
                        name="date"
                        value={modalData.date}
                        onChange={handleInput}
                      />
                      <Form.Control
                        required
                        type="time"
                        name="time"
                        value={modalData.time}
                        onChange={handleInput}
                      />
                      <textarea
                        placeholder="Details..."
                        rows="2"
                        className="form-control"
                        name="details"
                        value={modalData.details}
                        onChange={handleInput}
                      />
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="primary" onClick={editSession}>
                        Save
                      </Button>
                    </Modal.Footer>
                  </Modal>
                )}

                {/* <FiDelete className="session-action" /> */}
              </div>
            </Card.Header>
            <Card.Body>
              <Card.Title>
                {moment(session.date).format("L")} | {session.time}
              </Card.Title>
              <Card.Text>{session.details}</Card.Text>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No sessions logged for this client.</p>
      )}
    </>
  );
}

export default SessionsList;
