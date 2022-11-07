import Nav from "react-bootstrap/Nav";
import { useState } from "react";
import TrainerRequests from "./TrainerRequests";
import Badge from "react-bootstrap/Badge";
import TrainerClientList from "./TrainerClientList";

function TrainerPortal({ userState, requests, setRequests }) {
  const [filter, setFilter] = useState("clientlist");

  return (
    <>
      <section>
        <Nav justify variant="tabs" defaultActiveKey="link-1">
          <Nav.Item>
            <Nav.Link eventKey="link-1" onClick={() => setFilter("clientlist")}>
              My Clients
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2" onClick={() => setFilter("sessions")}>
              Sessions
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-3" onClick={() => setFilter("messages")}>
              Messages
              {requests && (
                <Badge className="noti" pill>
                  {requests.length}
                </Badge>
              )}
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </section>
      <section>
        {filter === "clientlist" && <TrainerClientList userState={userState} />}
        {filter === "sessions" && <div>sessions</div>}
        {filter === "messages" && (
          <TrainerRequests userState={userState} requests={requests} setRequests={setRequests} />
        )}
      </section>
    </>
  );
}

export default TrainerPortal;
