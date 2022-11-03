import "../../styles/Search.css";
import Form from "react-bootstrap/Form";

function Search({ setQueryPhrase }) {
  return (
    <>
      <Form.Control
        type="text"
        placeholder="Search..."
        onChange={(e) => setQueryPhrase(e.target.value)}
      />
    </>
  );
}

export default Search;
