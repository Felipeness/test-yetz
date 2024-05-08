import React from "react";

interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <div>
      <p style={{ color: "red" }}>{message}</p>
    </div>
  );
};

export default ErrorDisplay;
