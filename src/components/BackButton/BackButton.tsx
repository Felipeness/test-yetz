import { useNavigate } from "react-router-dom";
import "./backButton.scss";
import { IoIosArrowBack } from "react-icons/io";

const BackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };

  return (
    <button className="button-container" onClick={goBack}>
      <IoIosArrowBack />
      Voltar
    </button>
  );
};

export default BackButton;
