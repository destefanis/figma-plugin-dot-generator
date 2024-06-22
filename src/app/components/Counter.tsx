import React, { useState } from "react";
import PropTypes from "prop-types";
import plus from "../assets/plus-icon.svg";
import minus from "../assets/minus-icon.svg";

const Counter = ({ label, count, onCountChange, min, max }) => {
  const handleIncrement = () => {
    const newCount = count >= max ? max : count + 1;
    onCountChange(newCount);
  };

  const handleDecrement = () => {
    const newCount = count <= min ? min : count - 1;
    onCountChange(newCount);
  };

  return (
    <div className="counter-wrapper">
      <div className="card-inner">
        <div className="row label-row">
          <div className="label counter-label">{label}</div>
        </div>
        <div className="row counter-row">
          <button onClick={handleDecrement} className="counter-button button-minus">
            <img src={minus} alt="Minus Icon" />
          </button>
          <div className="number-wrapper">
            <span className="counter-number">{count}</span>
          </div>
          <button onClick={handleIncrement} className="counter-button button-plus">
            <img src={plus} alt="Plus Icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

Counter.propTypes = {
  label: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  onCountChange: PropTypes.func.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired
};

export default Counter;
