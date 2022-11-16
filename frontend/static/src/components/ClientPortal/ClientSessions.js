import { useState, useEffect } from "react";
import { handleError } from "../../re-usable-func";
import moment from "moment";
import Card from "react-bootstrap/Card";

function ClientSessions({ userState }) {
  const [sessions, setSessions] = useState();

  useEffect(() => {
    const getSessions = async () => {
      const response = await fetch(`/api/v1/sessions/client/${userState.client_profile}/`).catch(
        handleError
      );
      if (!response.ok) {
        throw new Error("Network response was not ok!");
      }

      const data = await response.json();
      setSessions(data);
    };

    getSessions();
  }, [userState]);

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

  return (
    <section className="portal-display-area">
      <div className="portal-display-box">
        <h1 className="client-session-title">My Sessions</h1>
        {sessions && sessions.length > 0 ? (
          sessions.map((session) => (
            <Card key={session.id} className="session-card">
              <Card.Header className="session-head">
                <div className="client-info">
                  <img className="client-profile-img" src={session.trainerprofile.avatar} />
                  {session.trainerprofile.first_name} {session.trainerprofile.last_name}
                </div>
              </Card.Header>
              <Card.Body>
                <Card.Title>
                  {moment(session.date).format("L")} | {convertTime(session.date, session.time)}
                </Card.Title>
                <Card.Text className="session-details">{session.details}</Card.Text>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p className="no-data-label">
            When a trainer creates a session for you it will be listed here.
          </p>
        )}
      </div>
    </section>
  );
}
export default ClientSessions;
