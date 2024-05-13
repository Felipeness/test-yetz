import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PlanetInfo from "../../components/Planet/PlanetInfo";
import { fetchPlanets } from "../../api/swapi";
import { Planet } from "../../types/planet";
import "./planetInfoPage.scss";
import BackButton from "../../components/BackButton/BackButton";

const PlanetInfoPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [planet, setPlanet] = useState<Planet | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { type, value } = location.state as {
      type: "name" | "population";
      value: string;
    };

    if (value) {
      setIsLoading(true);
      fetchPlanets(type, value)
        .then((data) => {
          if (data) {
            setPlanet(data);
          } else {
            navigate("/not-planet-found");
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          navigate("/not-planet-found");
          setIsLoading(false);
        });
    } else {
      navigate("/not-planet-found");
      setIsLoading(false);
    }
  }, [location.state, navigate]);

  return (
    <div className="planet">
      {planet ? <PlanetInfo planet={planet} /> : <p className="loader"></p>}
      {!isLoading && <BackButton />}
    </div>
  );
};

export default PlanetInfoPage;
