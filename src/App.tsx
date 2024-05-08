import React from "react";
import { Routes, Route } from "react-router-dom";
import PlanetInfoPage from "./pages/Planet/PlanetInfoPage";
import SearchBarPage from "./pages/Search/SearchBarPage";
import "./styles/global.scss";

const App: React.FC = () => {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("/service-worker.js").then(
        function (registration) {
          console.log(
            "Service Worker registration successful with scope: ",
            registration.scope
          );
        },
        function (err) {
          console.log("Service Worker registration failed: ", err);
        }
      );
    });
  }

  return (
    <Routes>
      <Route path="/" element={<SearchBarPage />} />
      <Route path="/planet-info" element={<PlanetInfoPage />} />
    </Routes>
  );
};

export default App;
