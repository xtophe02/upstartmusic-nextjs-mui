import * as React from 'react';
import { Stack } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatchContext } from '../context/useStateContext';

export default function BasicSelect({ values, setValues }) {
  const dispatch = useDispatchContext();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    dispatch({ type: name.toUpperCase(), payload: value });
  };
  return (
    <Stack direction='row' spacing={3}>
      <FormControl>
        <InputLabel id='demo-simple-select-label'>Sort By</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={values.sort}
          label='Sort By'
          name='sort'
          onChange={handleChange}
        >
          <MenuItem value='name'>Name</MenuItem>
          <MenuItem value='age'>Age</MenuItem>
          <MenuItem value='netWorth'>Net Worth</MenuItem>
          <MenuItem value='yearsActive'>Years Active</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id='demo-simple-select-label2'>Order</InputLabel>
        <Select
          labelId='demo-simple-select-label2'
          id='demo-simple-select2'
          value={values.order}
          label='Order'
          name='order'
          onChange={handleChange}
        >
          <MenuItem value='1'>ASC</MenuItem>
          <MenuItem value='-1'>DESC</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
}
