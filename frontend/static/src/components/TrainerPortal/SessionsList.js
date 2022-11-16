import Card from "react-bootstrap/Card";
import { FiEdit } from "react-icons/fi";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Cookies from "js-cookie";
import { handleError } from "../../re-usable-func";
import moment from "moment";
import CloseButton from "react-bootstrap/CloseButton";

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

  const handleClose = (e) => {
    setShow(false);
    setModalData({
      client_details: {},
      trainer_profile: "",
      clientprofile: "",
      date: "",
      time: "",
      details: "",
    });
  };

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

  const convertTime = (date, time) => {
    const options = {
      timeStyle: "short",
      hour12: true,
    };
    const string = date + "T" + time;
    const newtime = new Date(string);

    const timeString = newtime.toLocaleString("en-US", options);

    return timeString;
  };

  const deleteSession = async () => {
    const response = await fetch(`/api/v1/sessions/${modalData.id}/`, {
      method: "DELETE",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    });
    const index = sessions.findIndex((session) => session.id === modalData.id);
    const updatedSessions = [...sessions];
    updatedSessions.splice(index, 1);
    setSessions(updatedSessions);
    setShow(false);
  };

  return (
    <>
      {sessions.length > 0 ? (
        sessions.map((session) => (
          <Card key={session.id} className="session-card">
            <Card.Header className="session-head">
              <div className="client-info">
                <img className="client-profile-img" src={session.client_details.avatar} />
                {session.client_details.first_name} {session.client_details.last_name}
              </div>
              <div>
                <FiEdit className="session-action" onClick={() => setActive(session.id)} />

                {modalData && (
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header className="edit-session-head">
                      <Modal.Title>
                        Edit {modalData.client_details.first_name}'s Session
                      </Modal.Title>
                      <CloseButton variant="white" onClick={(e) => handleClose(e)} />
                    </Modal.Header>
                    <Modal.Body>
                      <Form.Control
                        className="session-input"
                        required
                        type="date"
                        name="date"
                        value={modalData.date}
                        onChange={handleInput}
                      />
                      <Form.Control
                        className="session-input"
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
                    <Modal.Footer className="edit-session-foot">
                      <Button className="form-button" onClick={() => deleteSession()}>
                        Delete
                      </Button>
                      <Button className="form-button" onClick={editSession}>
                        Save
                      </Button>
                    </Modal.Footer>
                  </Modal>
                )}

                {/* <FiDelete className="session-action" /> */}
              </div>
            </Card.Header>
            <Card.Body>
              <Card.Title className="session-time">
                {moment(session.date).format("l")} | {convertTime(session.date, session.time)}
              </Card.Title>
              <Card.Text className="session-details">{session.details}</Card.Text>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p className="no-data-label">No sessions currently logged.</p>
      )}
    </>
  );
}

export default SessionsList;
