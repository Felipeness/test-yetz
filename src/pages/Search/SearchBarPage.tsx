import SearchBar from "../../components/Search/SearchBar";
import usePlanetSearch from "../../hooks/usePlanetSearch";

import "./searchBarPage.scss";

import SpaceShip from "../../assets/spaceship.svg";

import SubBackGround from "../../assets/sub-background.svg";

const SearchBarPage = () => {
  const handleSearch = usePlanetSearch();

  return (
    <div className="container">
      <div className="home">
        <div>
          <img src={SubBackGround} alt="" />
          <img className="space" src={SpaceShip} alt="Nave" />
        </div>

        <SearchBar onSearch={handleSearch} />
      </div>
    </div>
  );
};

export default SearchBarPage;
