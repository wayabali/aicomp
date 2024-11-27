import React from 'react';
import '../styles/nextButton.css';

const NextButton = ({ onClick }) => {
  return (
    <button className="nextButton" onClick={onClick}>
      Next
    </button>
  );
};

export default NextButton;
