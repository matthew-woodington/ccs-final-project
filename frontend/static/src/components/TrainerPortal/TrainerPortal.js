import "../../styles/TrainerPortal.css";
import Nav from "react-bootstrap/Nav";
import { useState, useEffect } from "react";
import { handleError } from "../../re-usable-func";
import TrainerRequests from "./TrainerRequests";
import Badge from "react-bootstrap/Badge";
import TrainerClientList from "./TrainerClientList";
import Sessions from "./Sessions";

function TrainerPortal({ userState, requests, setRequests }) {
  const [filter, setFilter] = useState("clientlist");
  const [clients, setClients] = useState();

  useEffect(() => {
    const getClients = async () => {
      const response = await fetch(
        `/api/v1/clientlists/trainer/${userState.trainer_profile}/`
      ).catch(handleError);
      if (!response.ok) {
        throw new Error("Network response was not ok!");
      }

      const data = await response.json();
      setClients(data);
    };

    getClients();
  }, [userState]);

  return (
    <>
      <section className="portal-nav">
        <Nav justify variant="button" defaultActiveKey="link-1" className="nav-tab-list">
          <Nav.Item className="nav-tab-item">
            <Nav.Link
              className="nav-tab-link"
              eventKey="link-1"
              onClick={() => setFilter("clientlist")}
            >
              My Clients
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="nav-tab-item">
            <Nav.Link
              className="nav-tab-link"
              eventKey="link-2"
              onClick={() => setFilter("sessions")}
            >
              Sessions
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="nav-tab-item">
            <Nav.Link
              className="nav-tab-link"
              eventKey="link-3"
              onClick={() => setFilter("messages")}
            >
              Messages
              {requests && requests.length > 0 && (
                <Badge className="noti" pill>
                  {requests.length}
                </Badge>
              )}
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </section>
      <section className="portal-display-area">
        {filter === "clientlist" && (
          <TrainerClientList userState={userState} clients={clients} setClients={setClients} />
        )}
        {filter === "sessions" && <Sessions userState={userState} clients={clients} />}
        {filter === "messages" && (
          <TrainerRequests
            userState={userState}
            requests={requests}
            setRequests={setRequests}
            clients={clients}
            setClients={setClients}
          />
        )}
      </section>
    </>
  );
}

export default TrainerPortal;
