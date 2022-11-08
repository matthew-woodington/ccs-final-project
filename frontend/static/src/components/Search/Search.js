import "../../styles/Home.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { IoClose } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

function Search({ distance, setDistance, queryPhrase, setQueryPhrase, setCurrentLocation }) {
  const clearText = (e) => {
    e.preventDefault();
    setQueryPhrase("");
  };

  return (
    <section className="search-section">
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
      <p>Enable location services or choose a location below:</p>
      <GooglePlacesAutocomplete
        apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
        selectProps={{
          placeholder: "Select a location...",
          onChange: (e) => setCurrentLocation(e.label),
        }}
      />

      <Form.Group className="mb-3 search-radius">
        <Form.Label>Distance radius (miles):</Form.Label>
        <Form.Select value={distance} onChange={(e) => setDistance(e.target.value)}>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={75}>75</option>
          <option value={100}>100</option>
          <option value={150}>150</option>
          <option value={200}>200</option>
        </Form.Select>
      </Form.Group>
    </section>
  );
}

export default Search;
