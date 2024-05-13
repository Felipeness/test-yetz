import BackButton from "../BackButton/BackButton";
import "./planetNotFound.scss";

const PlanetNotFound = () => {
  return (
    <div className="planet-not-found">
      <h2 className="planet-not-found__title">Planeta Não Encontrado</h2>
      <p className="planet-not-found__message">
        Nenhum planeta foi encontrado com os critérios especificados. Tente
        novamente com diferentes critérios de busca.
      </p>
      <BackButton />
    </div>
  );
};

export default PlanetNotFound;
