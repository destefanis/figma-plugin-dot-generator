import React, { useState } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import plus from "../assets/plus-icon.svg";
import minus from "../assets/minus-icon.svg";

const variants = {
  initial: (direction) => {
    return {
      translateY: direction > 0 ? "40%" : "-120%",
      translateX: "-50%",
      opacity: 0,
      scale: 0.6,
      transition: { type: "spring", duration: 0.4 }
    };
  },
  animate: {
    translateY: "-50%",
    translateX: "-50%",
    opacity: 1,
    scale: 1,
    transition: { type: "spring", duration: 0.4 }
  },
  exit: (direction) => {
    return {
      translateY: direction > 0 ? "-120%" : "40%",
      translateX: "-50%",
      opacity: 0,
      scale: 0.6,
      transition: { type: "spring", duration: 0.4 }
    };
  }
};

const Counter = ({ label, count, onCountChange, min, max }) => {
  const [direction, setDirection] = useState(0);

  const handleIncrement = () => {
    const newCount = count >= max ? max : count + 1;
    setDirection(1);
    onCountChange(newCount);
  };

  const handleDecrement = () => {
    const newCount = count <= min ? min : count - 1;
    setDirection(-1);
    onCountChange(newCount);
  };

  return (
    <div className="counter-wrapper">
      <div className="card-inner">
        <div className="row label-row">
          <div className="label counter-label">{label}</div>
        </div>
        <div className="row counter-row">
          <motion.button
            whileTap={{ scale: 0.8, opacity: 0.6 }}
            onClick={handleDecrement}
            className="counter-button button-minus"
          >
            <img src={minus} alt="Minus Icon" />
          </motion.button>
          <div className="number-wrapper">
            <AnimatePresence initial={false} custom={direction}>
              <motion.span
                key={count}
                className="counter-number"
                variants={variants}
                animate="animate"
                initial="initial"
                exit="exit"
                custom={direction}
              >
                {count}
              </motion.span>
            </AnimatePresence>
          </div>
          <motion.button
            whileTap={{ scale: 0.8, opacity: 0.6 }}
            onClick={handleIncrement}
            className="counter-button button-plus"
          >
            <img src={plus} alt="Plus Icon" />
          </motion.button>
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