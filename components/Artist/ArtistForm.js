import {
  Stack,
  TextField,
  FormGroup,
  FormControlLabel,
  Switch,
  Button,
} from '@mui/material';
export default function ArtistForm({ state, handleChange, handleSubmit }) {
  return (
    <Stack
      spacing={2}
      alignItems='center'
      component='form'
      onSubmit={handleSubmit}
    >
      <TextField
        label='Name'
        name='name'
        value={state.name}
        onChange={handleChange}
        variant='standard'
        sx={{ width: 500 }}
      />
      <TextField
        type='number'
        sx={{ width: 500 }}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        label='Age'
        variant='standard'
        name='age'
        value={state.age}
        onChange={handleChange}
      />
      <TextField
        type='number'
        sx={{ width: 500 }}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        label='Years Active'
        variant='standard'
        name='yearsActive'
        value={state.yearsActive}
        onChange={handleChange}
      />
      <TextField
        label='ImageURL (unsplash)'
        variant='standard'
        sx={{ width: 500 }}
        name='image'
        value={state.image}
        onChange={handleChange}
      />
      <TextField
        name='genre'
        value={state.genre}
        onChange={handleChange}
        label='Genre'
        variant='standard'
        sx={{ width: 500 }}
      />
      <TextField
        label='WebSite'
        variant='standard'
        sx={{ width: 500 }}
        name='website'
        value={state.website}
        onChange={handleChange}
      />
      <TextField
        label='Nickname'
        variant='standard'
        sx={{ width: 500 }}
        name='labelName'
        value={state.labelName}
        onChange={handleChange}
      />
      <TextField
        type='number'
        sx={{ width: 500 }}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        label='Net Worth'
        variant='standard'
        name='netWorth'
        value={state.netWorth}
        onChange={handleChange}
      />
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              onChange={handleChange}
              checked={state.retired}
              name='retired'
            />
          }
          label='Retired?'
        />
      </FormGroup>

      <Button type='submit' variant='outlined'>
        Submit
      </Button>
    </Stack>
  );
}
