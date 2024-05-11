import { useState } from "react";
import "./searchBar.scss";
import { FaSearch } from "react-icons/fa";
import useSearchStore from "../../store/useSearchStore";

interface SearchBarProps {
  onSearch: (query: { type: "name" | "population"; value: string }) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const { input, error, setInput, setError, validateInput } = useSearchStore();
  const [completion, setCompletion] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    setInput(userInput);
    validateInput(userInput);
    updateCompletion(userInput);
  };

  const updateCompletion = (userInput: string) => {
    if (!userInput) {
      setCompletion("");
      return;
    }
    const suggestions = ["Naboo", "Nar Shaddaa", "Nal Hutta"];
    const match = suggestions.find((s) =>
      s.toLowerCase().startsWith(userInput.toLowerCase())
    );
    setCompletion(
      match ? userInput + match.slice(userInput.length) : userInput
    );
  };

  const fillAutocomplete = () => {
    setInput(completion);
    setCompletion("");
  };

  const handleSearch = () => {
    if (input === "" || error) {
      setError("O campo não pode ficar vazio.");
      return;
    }
    const type = /^\d+$/.test(input) ? "population" : "name";
    onSearch({ type, value: input });
  };

  return (
    <div className="searchBar">
      <div className="title">
        Discover all the information about Planets of the Star Wars Saga
      </div>
      <input
        type="text"
        placeholder="Digite o nome do planeta ou população..."
        value={input}
        onChange={handleInputChange}
        onKeyDown={(e) => e.key === "Tab" && fillAutocomplete()}
        className={error ? "input-error" : ""}
      />
      <button onClick={handleSearch} disabled={!input || !!error}>
        <FaSearch />
        Search
      </button>
      <div className="autocomplete">
        <span className="input-backdrop">{completion}</span>
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default SearchBar;
