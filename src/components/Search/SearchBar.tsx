import React from "react";
import "./searchBar.scss";
import { FaSearch } from "react-icons/fa";
import useSearchStore from "../../hooks/useSearchStore";

interface SearchBarProps {
  onSearch: (query: { type: "name" | "population"; value: string }) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const { input, error, setInput, setError, validateInput } = useSearchStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInput(value);
    validateInput(value);
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
        className={error ? "input-error" : ""}
      />
      {error && <div className="error">{error}</div>}
      <button onClick={handleSearch} disabled={!input || !!error}>
        <FaSearch />
        Search
      </button>
    </div>
  );
};

export default SearchBar;
