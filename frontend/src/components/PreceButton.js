import React from 'react';
import '../styles/nextButton.css';

const PreceButton = ({ onClick }) => {
  return (
    <button className="PreceButton" onClick={onClick}>
      Precedent
    </button>
  );
};

export default PreceButton;
