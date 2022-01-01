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
import { getAllArtists } from '../utils/getData';
const buildParams = (values) => {
  const params = {};
  if (values.page) {
    params.page = values.page;
  }
  if (values.age) {
    params.age = JSON.stringify(values.age);
  }
  if (values.yearsActive) {
    params.yearsActive = JSON.stringify(values.yearsActive);
  }
  if (values.sort) {
    params.sort = values.sort;
  }
  if (values.order) {
    params.order = values.order;
  }
  if (values.text) {
    params.text = values.text;
  }
  return params;
};

const fetchDataCall = async (values) => {
  const params = buildParams(values);

  const { data } = await axios.get('/api/artists/', {
    params,
  });

  return data;
};

export default function IndexPage(props) {
  const { data } = props;

  const initValues = useStateContext();
  const dispatch = useDispatchContext();
  const [state, setState] = useState({
    ...initValues,
    text: '',
    artists: data.artists,
    pageCount: Math.ceil(Number(data.artistsCount) / 10),
    age: data.age,
    yearsActive: data.yearsActive,
    flag: false,
  });

  useEffect(() => {
    const fetchData = async (state) => {
      const res = await fetchDataCall(state);

      setState((prev) => ({ ...prev, artists: res.artists }));
    };

    fetchData(state);
  }, [state.sort, state.order, state.page]);
  // console.log('STATE', state);

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
                value={state.text}
                variant='outlined'
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    flag: true,
                    text: e.target.value,
                  }))
                }
              />
              <SliderComponent title='Age' values={state} setState={setState} />
              <SliderComponent
                title='Years Active'
                values={state}
                setState={setState}
              />
              <SelectComponent values={state} setValues={setState} />
              <Button
                variant='contained'
                disabled={!state.flag}
                onClick={async () => {
                  const res = await fetchDataCall(state);
                  setState((prev) => ({
                    ...prev,
                    artists: res.artists,
                    pageCount: Math.ceil(Number(res.artistsCount) / 10),
                  }));
                }}
              >
                Submit
              </Button>
              <Button
                variant='contained'
                color='error'
                onClick={() => {
                  dispatch({
                    type: 'CLEAR',
                    payload: { age: data.age, yearsActive: data.yearsActive },
                  });
                  setState({
                    text: '',
                    flag: false,
                    page: 1,
                    sort: 'name',
                    order: '1',
                    age: data.age,
                    yearsActive: data.yearsActive,
                    artists: data.artists,
                    pageCount: Math.ceil(Number(data.artistsCount) / 10),
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
              count={state.pageCount}
              color='primary'
              sx={{ paddingBottom: 2, mx: 'auto' }}
              page={state.page}
              onChange={(e, v) => {
                dispatch({ type: 'PAGE', payload: v });
                setState((prev) => ({ ...prev, page: v }));
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
  // const { data } = await axios.get(`${process.env.API_URL}/api/artists`);
  try {
    const { artistsCount, artists, age, yearsActive } = await getAllArtists();

    return {
      props: {
        data: { artistsCount, artists: JSON.parse(artists), age, yearsActive },
      },
      revalidate: 10,
    };
  } catch (error) {
    console.log(error);
    return { props: {} };
  }
}
