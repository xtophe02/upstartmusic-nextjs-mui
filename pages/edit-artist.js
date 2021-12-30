import { Typography, Button, Stack } from '@mui/material';
import Layout from '../components/Layout';
import { useContext, useState } from 'react';
import Link from '../src/Link';
import axios from 'axios';
import NotificationContext from '../store/notification-context';
import { useRouter } from 'next/router';
import ArtistForm from '../components/Artist/ArtistForm';

export default function EditArtistPage({ data }) {
  const [state, setState] = useState(data);
  const notificationCtx = useContext(NotificationContext);
  const router = useRouter();

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    if (name === 'retired') {
      return setState((prev) => ({ ...prev, [name]: checked }));
    }

    setState((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newState = Object.keys(state).reduce((acc, val) => {
      if (state[val] !== data[val]) {
        acc = { ...acc, [val]: state[val] };
      }
      return acc;
    }, {});

    try {
      await axios.post('/api/artist/update', {
        id: data._id,
        ...newState,
      });
      notificationCtx.showNotification({
        title: 'Successful saved on database',
        message:
          'This is a static web site revalidated every 10 seconds. meaning that this page will be re-builded after 10 seconds with the lattest data from database',
        status: 'success',
      });
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Stack spacing={2} direction='row' sx={{ mb: '3rem' }}>
        <Typography variant='h4'>Edit Artist</Typography>
        <Button
          variant='outlined'
          onClick={() => router.push(`/add-album?artistId=${data._id}`)}
        >
          Add Album
        </Button>
      </Stack>

      <ArtistForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        state={state}
      />
    </Layout>
  );
}
export async function getServerSideProps(context) {
  const { data } = await axios.get(
    `${process.env.API_URL}/api/artist/get/${context.query.id}`
  );
  return {
    props: { data }, // will be passed to the page component as props
  };
}
