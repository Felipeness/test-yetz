import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PlanetInfo from "../../components/Planet/PlanetInfo";
import { fetchPlanets } from "../../api/swapi";
import "./planetInfoPage.scss";
import BackButton from "../../components/BackButton/BackButton";
import usePlanetStore from "../../store/usePlanetStore";
import { Loader } from "../../components/Loader/Loader";

const PlanetInfoPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { planet, isLoading, setPlanet, setIsLoading } = usePlanetStore();

  useEffect(() => {
    const { type, value } = location.state as {
      type: "name" | "population";
      value: string;
    };

    if (!value) {
      navigate("/not-planet-found");
      return;
    }

    setIsLoading(true);
    fetchPlanets(type, value)
      .then((data) => {
        setPlanet(data || null);
        setIsLoading(false);
        if (!data) navigate("/not-planet-found");
      })
      .catch((error) => {
        console.error("Fetching planets failed:", error);
        navigate("/not-planet-found");
        setIsLoading(false);
      });
  }, [location.state, navigate, setPlanet, setIsLoading]);

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );

  return (
    <div className="planet">
      {planet ? <PlanetInfo planet={planet} /> : <p>Planeta não encontrado.</p>}
      <BackButton />
    </div>
  );
};

export default PlanetInfoPage;
