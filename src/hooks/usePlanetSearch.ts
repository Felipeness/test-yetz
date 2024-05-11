import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { SearchParams } from "../types/searchParams";

const usePlanetSearch = () => {
  const navigate = useNavigate();

  const handleSearch = useCallback(
    ({ type, value }: SearchParams) => {
      navigate("/planet-info", { state: { type, value } });
    },
    [navigate]
  );

  return handleSearch;
};

export default usePlanetSearch;
