import React, { useState } from 'react';
import PropTypes from 'prop-types';

const colorSchemes = [
//   { dotColor: '#294172', frameColor: '#DCB7B6' },
  { dotColor: '#282116', frameColor: '#E3E4E0' },
  { dotColor: '#B8B8B8', frameColor: '#0D0D0D' },
  { dotColor: '#1A99E5', frameColor: '#D6EFFE' }
];

const ColorSchemePicker = ({ onSchemeChange }) => {
  const [activeScheme, setActiveScheme] = useState(0);

  const handleSchemeChange = (index) => {
    setActiveScheme(index);
    const selectedScheme = colorSchemes[index];
    onSchemeChange({
      dotColor: hexToRgb(selectedScheme.dotColor),
      frameColor: hexToRgb(selectedScheme.frameColor)
    });
  };

  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r: r / 255, g: g / 255, b: b / 255 };
  };

  return (
    <div className="color-scheme-picker">
      <span className="color-scheme-label">Color Scheme</span>
      <div className="color-scheme-options">
        {colorSchemes.map((scheme, index) => (
          <div
            key={index}
            className={`color-scheme-circle ${index === activeScheme ? 'active' : ''}`}
            onClick={() => handleSchemeChange(index)}
          >
            <div
              className="color-scheme-half"
              style={{ backgroundColor: scheme.frameColor }}
            />
            <div
              className="color-scheme-half"
              style={{ backgroundColor: scheme.dotColor }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

ColorSchemePicker.propTypes = {
  onSchemeChange: PropTypes.func.isRequired
};

export default ColorSchemePicker;
