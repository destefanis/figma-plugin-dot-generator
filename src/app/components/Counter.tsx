import React, { useState } from "react";
import PropTypes from "prop-types";
import plus from "../assets/plus-icon.svg";
import minus from "../assets/minus-icon.svg";

const Counter = ({ label, count, onCountChange, min, max, onEnterPress }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleIncrement = () => {
    const newCount = count >= max ? max : count + 1;
    onCountChange(newCount);
  };

  const handleDecrement = () => {
    const newCount = count <= min ? min : count - 1;
    onCountChange(newCount);
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    const newCount = parseInt(input, 10);

    // If input is not empty, ensure it's within min and max and doesn't exceed length constraints
    if (
      input === "" ||
      (!isNaN(newCount) && input.length <= max.toString().length)
    ) {
      onCountChange(input === "" ? "" : newCount);
    }
  };

  const handleBlur = () => {
    if (count === "" || count < min || count === 0) {
      onCountChange(min);
    } else if (count > max) {
      onCountChange(max);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onEnterPress();
    }
  };

  // Convert count to an array of digits
  const countDigits = count.toString().split("");

  return (
    <div className="counter-wrapper">
      <div className="card-inner">
        <div className="row label-row">
          <div className="label counter-label">{label}</div>
        </div>
        <div className="row counter-row">
          <button
            onClick={handleDecrement}
            className="counter-button button-minus"
          >
            <img src={minus} alt="Minus Icon" />
          </button>
          <div className="number-wrapper">
            {isEditing ? (
              <input
                type="number"
                value={count}
                onChange={handleInputChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className="counter-input"
                autoFocus
              />
            ) : (
              <div
                className="digits-container"
                onClick={() => setIsEditing(true)}
              >
                {countDigits.map((digit, index) => (
                  <div key={index} className="digit-container">
                    <span className="counter-number">
                      {digit}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={handleIncrement}
            className="counter-button button-plus"
          >
            <img src={plus} alt="Plus Icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

Counter.propTypes = {
  label: PropTypes.string,
  count: PropTypes.number.isRequired,
  onCountChange: PropTypes.func.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onEnterPress: PropTypes.func.isRequired
};

export default Counter;
