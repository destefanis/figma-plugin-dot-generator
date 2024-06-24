import React, { useState } from "react";
import PropTypes from "prop-types";
import plus from "../assets/plus-icon.svg";
import minus from "../assets/minus-icon.svg";

const DecimalCounter = ({ label, count, onCountChange, min, max, step, onEnterPress }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleIncrement = () => {
    const newCount = count >= max ? max : parseFloat((count + step).toFixed(1));
    onCountChange(newCount);
  };

  const handleDecrement = () => {
    const newCount = count <= min ? min : parseFloat((count - step).toFixed(1));
    onCountChange(newCount);
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    const newCount = parseFloat(input);

    // If input is not empty, ensure it's within min and max and is a valid decimal number
    if (
      input === "" ||
      (!isNaN(newCount) && newCount.toFixed(1).length <= max.toFixed(1).length)
    ) {
      onCountChange(input === "" ? "" : newCount);
    }
  };

  const handleBlur = () => {
    if (count === "" || count < min) {
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
                step={step}
                min={min}
                max={max}
              />
            ) : (
              <div
                className="digits-container"
                onClick={() => setIsEditing(true)}
              >
                <span className="counter-number">{count}</span>
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

DecimalCounter.propTypes = {
  label: PropTypes.string,
  count: PropTypes.number.isRequired,
  onCountChange: PropTypes.func.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  onEnterPress: PropTypes.func.isRequired,
};

export default DecimalCounter;
