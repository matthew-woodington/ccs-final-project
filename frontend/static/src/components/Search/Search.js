import "../../styles/Search.css";
import Form from "react-bootstrap/Form";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

function Search({ queryPhrase, setQueryPhrase, clearInput }) {
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
