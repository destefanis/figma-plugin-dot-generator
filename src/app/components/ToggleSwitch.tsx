import React from 'react';
import PropTypes from 'prop-types';

const ToggleSwitch = ({ label, isChecked, onChange }) => {
  return (
    <div className="toggle-container">
      <span className="toggle-label">{label}</span>
      <div className={`toggle-switch ${isChecked ? 'checked' : ''}`} onClick={() => onChange(!isChecked)}>
        <div className="toggle-handle"></div>
      </div>
    </div>
  );
};

ToggleSwitch.propTypes = {
  label: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ToggleSwitch;
