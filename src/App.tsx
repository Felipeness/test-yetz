import React from "react";
import { Routes, Route } from "react-router-dom";
import PlanetInfoPage from "./pages/Planet/PlanetInfoPage";
import SearchBarPage from "./pages/Search/SearchBarPage";
import "./styles/global.scss";
import PlanetNotFound from "./components/PlanetNotFound/PlanetNotFound";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SearchBarPage />} />
      <Route path="/planet-info" element={<PlanetInfoPage />} />
      <Route path="/not-planet-found" element={<PlanetNotFound />} />
    </Routes>
  );
};

export default App;
