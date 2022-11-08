import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";

function Sessions({ userState, clients }) {
  const [filter, setFilter] = useState("all");
  const [newSession, setNewSession] = useState({
    trainerprofile: userState.trainer_profile,
    clientprofile: null,
    date: null,
    time: null,
    details: null,
  });

  const handleSelectChange = (value) => {
    setFilter(value);
    convertProfileNum(value);
  };

  const convertProfileNum = (value) => {
    if (value !== "all") {
      const filterAsNum = parseInt(value);
      console.log(filterAsNum);
      setNewSession({
        ...newSession,
        clientprofile: filterAsNum,
      });
    }
  };

  return (
    <>
      <section>
        <Form.Select onChange={(e) => handleSelectChange(e.target.value)}>
          <option value="all">All</option>
          {clients &&
            clients.map((client) => (
              <option key={client.id} value={client.clientprofile.id}>
                {client.clientprofile.first_name} {client.clientprofile.last_name}
              </option>
            ))}
        </Form.Select>
      </section>
      <section>
        {filter === "all" ? (
          <>
            <Form.Control disabled type="date" />
            <Form.Control disabled type="time" />
            <div className="new-session">
              <div>
                <textarea
                  disabled
                  placeholder="Details..."
                  rows="1"
                  className="form-control"
                  name="details"
                />
              </div>
              <div>
                <Button disabled className="form-button">
                  New Session
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <Form.Control type="date" />
            <Form.Control type="time" />
            <div className="new-session">
              <div>
                <textarea
                  placeholder="Details..."
                  rows="1"
                  className="form-control"
                  name="details"
                />
              </div>
              <div>
                <Button className="form-button">New Session</Button>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
}

export default Sessions;
