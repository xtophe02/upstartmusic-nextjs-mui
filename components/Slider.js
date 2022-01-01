import * as React from 'react';
import { Typography, Box, Slider } from '@mui/material';
import { useDispatchContext } from '../context/useStateContext';

// function valuetext(value) {
//   return `${value}°C`;
// }

export default function SliderComponent({ title, setState, values }) {
  const dispatch = useDispatchContext();
  const handleChange = (event, newValue) => {
    if (title === 'Age') {
      setState((prev) => ({ ...prev, age: newValue, flag: true }));
      dispatch({ type: 'AGE', payload: newValue });
    } else {
      setState((prev) => ({
        ...prev,
        yearsActive: newValue,
        flag: true,
      }));
      dispatch({ type: 'YEARS_ACTIVE', payload: newValue });
    }
  };

  return (
    <Box>
      <Typography id='input-slider' gutterBottom>
        {title}
      </Typography>{' '}
      <Slider
        // getAriaLabel={() => 'Temperature range'}
        value={title === 'Age' ? values.age : values.yearsActive}
        onChange={handleChange}
        valueLabelDisplay='auto'
        max={50}
        // getAriaValueText={valuetext}
        // valueLabelDisplay='on'
      />
    </Box>
  );
}
