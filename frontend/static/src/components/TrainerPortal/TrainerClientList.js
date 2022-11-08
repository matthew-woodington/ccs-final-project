import { useState, useEffect } from "react";
import { handleError } from "../../re-usable-func";
import Accordion from "react-bootstrap/Accordion";
import { FiEdit } from "react-icons/fi";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Cookies from "js-cookie";

function TrainerClientList({ userState, clients, setClients }) {
  // const [clients, setClients] = useState();
  const [modalData, setModalData] = useState({
    trainer_profile: "",
    clientprofile: "",
    note: "",
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

  // useEffect(() => {
  //   const getClients = async () => {
  //     const response = await fetch(
  //       `/api/v1/clientlists/trainer/${userState.trainer_profile}/`
  //     ).catch(handleError);
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok!");
  //     }

  //     const data = await response.json();
  //     setClients(data);
  //   };

  //   getClients();
  // }, [userState]);

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
      <section>
        {clients ? (
          clients.map((client) => (
            <Accordion key={client.id}>
              <Accordion.Item eventKey={client.id}>
                <Accordion.Header>
                  <img className="client-profile-img" src={client.clientprofile.avatar} />
                  {client.clientprofile.first_name} {client.clientprofile.last_name}
                </Accordion.Header>
                <Accordion.Body>
                  <p>Contact: {client.clientprofile.email}</p>
                  <div className="note-head">
                    <p>Note:</p>
                    <FiEdit onClick={() => setActive(client.id)} />
                  </div>
                  {modalData && (
                    <Modal show={show} onHide={handleClose} animation={false}>
                      <Modal.Header closeButton>
                        <Modal.Title>{modalData.clientprofile.first_name} Note</Modal.Title>
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
                      <Modal.Footer>
                        <Button variant="primary" onClick={editNote}>
                          Save
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  )}
                  {client.note && client.note}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          ))
        ) : (
          <div>When you add clients they will show here.</div>
        )}
      </section>
    </>
  );
}

export default TrainerClientList;
