import { useNavigate } from "react-router-dom";

const usePlanetSearch = () => {
  const navigate = useNavigate();

  const handleSearch = ({
    type,
    value,
  }: {
    type: "name" | "population";
    value: string;
  }) => {
    navigate("/planet-info", { state: { type, value } });
  };
  return handleSearch;
};

export default usePlanetSearch;
