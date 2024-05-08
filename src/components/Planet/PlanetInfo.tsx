import React from "react";

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
  const formatUrlPath = (url: string) => {
    const parts = url.split("/").filter((part: unknown) => part);
    let result = parts.slice(-2).join(" ");

    result = result.replace(/(\d+)$/, " $1 ,");

    return result;
  };

  return (
    <div className="planet-info-container">
      {planet ? (
        <div className="planet-info-all">
          <div className="planet-info">
            <div className="planet-text-img">
              <img src={planet.imageUrl} alt={`Imagem de ${planet.name}`} />
              <p>
                Planet: <span> {planet.name} </span>
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
                <li key={index}>{formatUrlPath(resident)}</li>
              ))}
            </ul>
          </div>
          <div className="films">
            <PiFilmSlateFill />
            <strong>Films:</strong>
            <ul>
              {planet.films.map((film, index) => (
                <li key={index}>{formatUrlPath(film)}</li>
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
