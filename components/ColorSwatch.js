import React from 'react';
import PropTypes from 'prop-types';

const ColorSwatch = ({isSelected, color, onClick}) => {
  const selectedClasses = isSelected ? 'border-black' : 'border-gray-300 cursor-pointer';
  return (
    <div
      className={`${color.cssClass} ${selectedClasses} border-2 w-8 h-8 mr-1`}
      onClick={() => onClick(color.name)}
    />
  );
};

ColorSwatch.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  color: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default ColorSwatch;