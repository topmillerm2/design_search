import React from 'react';
import { COLORS } from '../constants';

const ColorsRadioButtons = ({ onRadioChange, radioValue }) => {
  return (
    <div className='inline fields'>
      <label>Filter by Color Theme</label>
      <div className='field'>
        <div className='ui radio checkbox'>
          <input
            type='radio'
            name='theme'
            value=''
            onChange={onRadioChange}
            checked={!radioValue}
          />
          <label>All</label>
        </div>
      </div>
      {COLORS.map((color) => (
        <div key={color} className='field'>
          <div className='ui radio checkbox'>
            <input
              type='radio'
              name='theme'
              value={color.toLowerCase()}
              onChange={onRadioChange}
              checked={radioValue === color.toLowerCase()}
            />
            <label>{color}</label>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ColorsRadioButtons;
