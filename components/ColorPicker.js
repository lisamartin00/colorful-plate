import React from 'react';
import PropTypes from 'prop-types';
import COLORS from '../constants/colors'
import ColorSwatch from './ColorSwatch';

const ColorPicker = ({selectedColor, onClick}) => {
  return (
    <div className="flex mr-3">
      {COLORS.map((color) => {
        const isSelected = color.name === selectedColor;
        return (
          <ColorSwatch
            isSelected={isSelected}
            color={color}
            onClick={onClick}
            key={color.name}
          />
        );
      })}
    </div>
  );
};

ColorPicker.propTypes = {
  selectedColor: PropTypes.string,
  onClick: PropTypes.func,
};

export default ColorPicker;