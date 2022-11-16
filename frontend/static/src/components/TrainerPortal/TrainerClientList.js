import { useState, useEffect } from "react";
import { handleError } from "../../re-usable-func";
import Accordion from "react-bootstrap/Accordion";
import { FiEdit } from "react-icons/fi";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Cookies from "js-cookie";
import CloseButton from "react-bootstrap/CloseButton";

function TrainerClientList({ userState, clients, setClients }) {
  const [modalData, setModalData] = useState({
    client_details: {},
    trainer_profile: "",
    clientprofile: "",
    note: "",
  });
  const [show, setShow] = useState(false);

  const handleClose = (e) => {
    setShow(false);
    setModalData({
      client_details: {},
      trainer_profile: "",
      clientprofile: "",
      note: "",
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
    const index = clients.findIndex((client) => client.id === id);
    setModalData(clients[index]);
    setShow(true);
  };

  const editNote = async () => {
    const note = {
      note: modalData.note,
    };

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(note),
    };
    const response = await fetch(`/api/v1/clientlists/${modalData.id}/`, options).catch(
      handleError
    );
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
      console.log(data);
      const index = clients.findIndex((client) => client.id === data.id);
      const updatedClients = [...clients];
      updatedClients.splice(index, 1, data);
      setClients(updatedClients);
      setShow(false);
    }
  };

  return (
    <>
      <section className="portal-display-box">
        {clients && clients.length > 0 ? (
          <Accordion>
            {clients.map((client) => (
              <Accordion.Item className="client-list" key={client.id} eventKey={client.id}>
                <Accordion.Header>
                  <img className="client-profile-img" src={client.client_details.avatar} />
                  {client.client_details.first_name} {client.client_details.last_name}
                </Accordion.Header>
                <Accordion.Body>
                  <p>Contact: {client.client_details.email}</p>
                  <div className="note">
                    <div className="note-head">
                      <p>Note:</p>
                      <FiEdit onClick={() => setActive(client.id)} />
                    </div>
                    {modalData && (
                      <Modal show={show} onHide={handleClose}>
                        <Modal.Header className="note-modal-head">
                          <Modal.Title>{modalData.client_details.first_name}'s Note</Modal.Title>
                          <CloseButton variant="white" onClick={(e) => handleClose(e)} />
                        </Modal.Header>
                        <Modal.Body>
                          <textarea
                            required
                            placeholder="Note..."
                            rows="2"
                            className="form-control"
                            name="note"
                            value={modalData.note}
                            onChange={handleInput}
                          />
                        </Modal.Body>
                        <Modal.Footer className="note-modal-foot">
                          <Button className="form-button" onClick={editNote}>
                            Save
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    )}
                    {client.note && client.note}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        ) : (
          <p className="no-data-label">When you add clients they will be listed here.</p>
        )}
      </section>
    </>
  );
}

export default TrainerClientList;
