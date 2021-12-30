import { Button, Stack, TextField } from '@mui/material';
import { MobileDatePicker, LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDateFns';

export default function AlbumField({ state, handleChange, handleSubmit }) {
  return (
    <Stack spacing={3} component='form' onSubmit={handleSubmit}>
      <TextField
        label='Title'
        variant='standard'
        name='title'
        value={state.title}
        onChange={handleChange}
      />
      <TextField
        type='number'
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        label='Copies Sold'
        variant='standard'
        name='copiesSold'
        value={state.copiesSold}
        onChange={handleChange}
      />
      <TextField
        type='number'
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        label='Number Tracks'
        variant='standard'
        name='numberTracks'
        value={state.numberTracks}
        onChange={handleChange}
      />
      <TextField
        label='Image'
        variant='standard'
        name='image'
        value={state.image}
        onChange={handleChange}
      />
      <TextField
        type='number'
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        label='Revenue'
        variant='standard'
        name='revenue'
        value={state.revenue}
        onChange={handleChange}
      />
      <LocalizationProvider dateAdapter={DateAdapter}>
        <MobileDatePicker
          label='Date mobile'
          inputFormat='dd/MM/yyyy'
          value={state.date}
          onChange={handleChange}
          name='date'
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <Button variant='outlined' type='submit'>
        Submit
      </Button>
    </Stack>
  );
}
