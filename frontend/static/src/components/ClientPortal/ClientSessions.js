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
    <>
      <section>
        {sessions &&
          sessions.map((session) => (
            <Card key={session.id}>
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
                <Card.Text>{session.details}</Card.Text>
              </Card.Body>
            </Card>
          ))}
      </section>
    </>
  );
}
export default ClientSessions;
