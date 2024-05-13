import { useState, useEffect } from "react";

import { Planet } from "../../types/planet";

import "./planetInfo.scss";
import { FaThermometerHalf } from "react-icons/fa";
import { FaMountainSun } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { PiFilmSlateFill } from "react-icons/pi";
import { IoPerson } from "react-icons/io5";

interface PlanetInfoProps {
  planet: Planet | null;
}

const PlanetInfo: React.FC<PlanetInfoProps> = ({ planet }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableName, setEditableName] = useState("");

  useEffect(() => {
    if (planet) {
      const storedName = sessionStorage.getItem(`planetName_${planet.name}`);
      sessionStorage.removeItem(`planetName_${planet.name}`);
      setEditableName(storedName || planet.name);
    }
  }, [planet]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (planet) {
      sessionStorage.setItem(`planetName_${planet.name}`, editableName);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditableName(e.target.value);
  };

  return (
    <div className="planet-info-container">
      {planet ? (
        <div className="planet-info-all">
          <div className="planet-info">
            <div className="planet-text-img">
              <img src={planet.imageUrl} alt={`Imagem de ${editableName}`} />
              <p>
                Planet:{" "}
                {isEditing ? (
                  <input
                    type="text"
                    value={editableName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoFocus
                  />
                ) : (
                  <span onDoubleClick={handleDoubleClick}>{editableName}</span>
                )}
              </p>
            </div>
            <div className="sub-info">
              <p>
                <FaThermometerHalf />
                <span>Climate:</span> {planet.climate}
              </p>
              <p>
                <FaMountainSun />
                <span>Terrain:</span> {planet.terrain}
              </p>
              <p>
                <IoIosPeople />
                <span>Population:</span> {planet.population}
              </p>
            </div>
          </div>
          <div className="residents">
            <IoPerson />
            <strong>Residents:</strong>
            <ul>
              {planet.residents.map((resident, index) => (
                <li key={index}>
                  {" "}
                  {resident}
                  {index < planet.residents.length - 1 ? ", " : ""}
                </li>
              ))}
            </ul>
          </div>
          <div className="films">
            <PiFilmSlateFill />
            <strong>Films:</strong>
            <ul>
              {planet.films.map((film, index) => (
                <li key={index}>
                  {" "}
                  {film}
                  {index < planet.films.length - 1 ? ", " : ""}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p className="no-planet-select">
          Selecione um planeta para ver mais informações.
        </p>
      )}
    </div>
  );
};

export default PlanetInfo;
