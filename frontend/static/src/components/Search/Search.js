import "../../styles/Home.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { IoClose } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

function Search({
  distance,
  setDistance,
  queryPhrase,
  setQueryPhrase,
  currentLocation,
  setCurrentLocation,
  clearFilters,
}) {
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
        <Button
          className="query-search-button"
          id="button-addon2"
          type="button"
          onClick={(e) => clearText(e)}
        >
          {queryPhrase.length === 0 && <IoSearch className="search-icon" />}
          {queryPhrase.length > 0 && <IoClose className="search-icon" />}
        </Button>
      </InputGroup>
      {/* <p className="search-label">Enable location services or choose a location below:</p> */}
      <GooglePlacesAutocomplete
        className="autocomplete-search"
        apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
        selectProps={{
          placeholder: currentLocation,
          value: currentLocation,
          onChange: (e) => setCurrentLocation(e.label),
        }}
      />

      <Form.Group className="mb-3 search-radius">
        <Form.Label className="search-label">Distance radius (miles):</Form.Label>
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

      <Button className="form-button" type="button" onClick={() => clearFilters()}>
        Clear Search Filters
      </Button>
    </section>
  );
}

export default Search;
