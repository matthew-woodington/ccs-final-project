import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { handleError } from "../../re-usable-func";
import SessionsList from "./SessionsList";
import Cookies from "js-cookie";

function Sessions({ userState, clients }) {
  const [sessions, setSessions] = useState();
  const [filter, setFilter] = useState(0);
  const [newSession, setNewSession] = useState({
    trainerprofile: userState.trainer_profile,
    clientprofile: null,
    date: "",
    time: "",
    details: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setNewSession((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (value) => {
    const filterAsNum = parseInt(value);
    setFilter(filterAsNum);
    if (filterAsNum !== 0) {
      setNewSession({
        ...newSession,
        clientprofile: filterAsNum,
      });
    } else {
      setNewSession({
        ...newSession,
        clientprofile: null,
      });
    }
  };

  useEffect(() => {
    if (filter === 0) {
      const getSessions = async () => {
        const response = await fetch(
          `/api/v1/sessions/trainer/${userState.trainer_profile}/`
        ).catch(handleError);
        if (!response.ok) {
          throw new Error("Network response was not ok!");
        }

        const data = await response.json();
        setSessions(data);
      };
      getSessions();
    } else if (filter !== 0) {
      const getFilteredSessions = async () => {
        const response = await fetch(
          `/api/v1/sessions/trainer/${userState.trainer_profile}/client/${filter}`
        ).catch(handleError);
        if (!response.ok) {
          throw new Error("Network response was not ok!");
        }

        const data = await response.json();
        setSessions(data);
      };
      getFilteredSessions();
    }
  }, [userState, filter]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(newSession),
    };
    const response = await fetch(
      `/api/v1/sessions/trainer/${userState.trainer_profile}/`,
      options
    ).catch(handleError);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
      console.log(data);
      setSessions([...sessions, data]);
      setNewSession({
        trainerprofile: userState.trainer_profile,
        clientprofile: null,
        date: "",
        time: "",
        details: "",
      });
    }
  };

  return (
    <>
      <section>
        <Form.Select onChange={(e) => handleSelectChange(e.target.value)}>
          <option value={0}>All</option>
          {clients &&
            clients.map((client) => (
              <option key={client.id} value={client.clientprofile}>
                {client.client_details.first_name} {client.client_details.last_name}
              </option>
            ))}
        </Form.Select>
      </section>
      <section>
        {filter === 0 ? (
          <>
            <Form.Control
              disabled
              required
              type="date"
              name="date"
              value={newSession.date}
              onChange={handleInput}
            />
            <Form.Control
              disabled
              required
              type="time"
              name="time"
              value={newSession.time}
              onChange={handleInput}
            />
            <div className="new-session">
              <div>
                <textarea
                  disabled
                  placeholder="Details..."
                  rows="1"
                  className="form-control"
                  name="details"
                  value={newSession.details}
                  onChange={handleInput}
                />
              </div>
              <div>
                <Button disabled className="form-button" onClick={handleSubmit}>
                  New Session
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control
                  required
                  type="date"
                  name="date"
                  value={newSession.date}
                  onChange={handleInput}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  required
                  type="time"
                  name="time"
                  value={newSession.time}
                  onChange={handleInput}
                />
              </Form.Group>
              <div className="new-session">
                <div>
                  <Form.Group>
                    <textarea
                      placeholder="Details..."
                      rows="1"
                      className="form-control"
                      name="details"
                      value={newSession.details}
                      onChange={handleInput}
                    />
                  </Form.Group>
                </div>
                <div>
                  <Button className="form-button" type="submit">
                    New Session
                  </Button>
                </div>
              </div>
            </Form>
          </>
        )}
      </section>
      <section>
        {sessions && <SessionsList sessions={sessions} setSessions={setSessions} filter={filter} />}
      </section>
    </>
  );
}

export default Sessions;
