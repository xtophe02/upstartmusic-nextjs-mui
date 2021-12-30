import Layout from '../components/Layout';
import SliderComponent from '../components/Slider';
import SelectComponent from '../components/SelectComponent';
import axios from 'axios';
import ArtistsList from '../components/Artists/ArtistsList';
import {
  Grid,
  Stack,
  Typography,
  TextField,
  Pagination,
  Button,
  Paper,
  Box,
} from '@mui/material';

import { useEffect, useState } from 'react';
import {
  useDispatchContext,
  useStateContext,
} from '../context/useStateContext';

const fetchDataCall = async (values) => {
  const { page, age, sort, order, yearsActive, text } = values;

  const { data } = await axios.get('/api/artists/', {
    params: {
      page,
      sort,
      order,
      text,
      age: JSON.stringify(age),
      yearsActive: JSON.stringify(yearsActive),
    },
  });

  return data;
};

export default function IndexPage({ data }) {
  const initValues = useStateContext();
  const dispatch = useDispatchContext();
  const [state, setState] = useState({
    artists: data.artists,
    total: data.total.length,
  });
  // console.log(initValues);
  const [values, setValues] = useState({
    ...initValues,
    flag: false,
    text: '',
    age: [data.age[0], data.age[1]],
    yearsActive: [data.yearsActive[0], data.yearsActive[1]],
  });

  useEffect(() => {
    const fetchData = async (values) => {
      const res = await fetchDataCall(values);

      setState({ artists: res.artists, total: Math.ceil(Number(res.total)) });
    };

    fetchData(values);
  }, [values.sort, values.order, values.page]);
  // console.log('STATE', state);
  const pageCount = Math.ceil(Number(state.total) / 10);

  return (
    <Layout>
      <Grid container spacing={5}>
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ padding: '1.5rem' }}>
            <Stack spacing={2}>
              <Typography align='center' variant='h3'>
                Search
              </Typography>
              <TextField
                id='outlined-basic'
                label='Search Name'
                value={values.text}
                variant='outlined'
                onChange={(e) =>
                  setValues((prev) => ({
                    ...prev,
                    flag: true,
                    text: e.target.value,
                  }))
                }
              />
              <SliderComponent
                title='Age'
                values={values}
                setValues={setValues}
              />
              <SliderComponent
                title='Years Active'
                values={values}
                setValues={setValues}
              />
              <SelectComponent values={values} setValues={setValues} />
              <Button
                variant='contained'
                disabled={!values.flag}
                onClick={async () => {
                  dispatch({ type: 'SLIDER_FILTER', payload: values });

                  const res = await fetchDataCall(values);

                  setState({
                    artists: res.artists,
                    total: Math.ceil(Number(res.total)),
                  });
                }}
              >
                Submit
              </Button>
              <Button
                variant='contained'
                color='error'
                onClick={() => {
                  setValues({
                    text: '',
                    flag: false,
                    page: 1,
                    sort: 'name',
                    order: '1',
                    age: [0, 50],
                    yearsActive: [0, 50],
                  });
                  dispatch({ type: 'CLEAR' });

                  setState({
                    artists: data.artists,
                    total: data.total.length,
                  });
                }}
              >
                Clear
              </Button>
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box sx={{ display: 'flex' }}>
            <Pagination
              count={pageCount}
              color='primary'
              sx={{ paddingBottom: 2, mx: 'auto' }}
              page={values.page}
              onChange={(e, v) => {
                setValues((prev) => ({ ...prev, page: v }));
                dispatch({ type: 'PAGE', payload: v });
              }}
            />
          </Box>

          <ArtistsList data={state.artists} />
        </Grid>
      </Grid>
    </Layout>
  );
}
export async function getStaticProps(context) {
  const { data } = await axios.get(`${process.env.API_URL}/api/artists`);

  return {
    props: { data },
    revalidate: 10,
  };
}
