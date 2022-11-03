import "../../styles/Search.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { IoClose } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";

function Search({ distance, setDistance, queryPhrase, setQueryPhrase }) {
  const clearText = (e) => {
    e.preventDefault();
    setQueryPhrase("");
  };

  return (
    <section>
      <InputGroup className="mb-3">
        <Form.Control
          aria-label="Search"
          aria-describedby="basic-addon2"
          type="text"
          placeholder="Search..."
          value={queryPhrase}
          onChange={(e) => setQueryPhrase(e.target.value)}
        />
        <Button variant="dark" id="button-addon2" type="button">
          {queryPhrase.length === 0 && <IoSearch />}
          {queryPhrase.length > 0 && <IoClose onClick={(e) => clearText(e)} />}
        </Button>
      </InputGroup>

      <Form.Group>
        <Form.Select value={distance} onChange={(e) => setDistance(e.target.value)}>
          <option value={10}>10 miles</option>
          <option value={25}>25 miles</option>
          <option value={50}>50 miles</option>
          <option value={75}>75 miles</option>
          <option value={100}>100 miles</option>
          <option value={150}>150 miles</option>
          <option value={200}>200 miles</option>
        </Form.Select>
      </Form.Group>
    </section>
  );
}

export default Search;
