import { Typography, Button } from '@mui/material';
import Layout from '../components/Layout';
import { useContext, useState } from 'react';
import axios from 'axios';
import NotificationContext from '../store/notification-context';
import { useRouter } from 'next/router';
import AlbumField from '../components/AlbumField';

export const initValuesAlbum = {
  title: '',
  date: new Date(),
  copiesSold: 0,
  numberTracks: 0,
  image: '',
  revenue: 0,
};

export default function AddAlbumPage() {
  const [state, setState] = useState(initValuesAlbum);
  const notificationCtx = useContext(NotificationContext);
  const router = useRouter();

  const handleChange = (event) => {
    if (!event.target) {
      setState((prev) => ({ ...prev, date: event }));
    } else {
      const { name, value } = event.target;

      setState((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    let flag = false;
    Object.keys(state).map((val) => {
      if (typeof state[val] === 'string' && state[val].trim() === '') {
        notificationCtx.showNotification({
          title: 'Empty Values',
          message: 'cannot submit empty values',
          status: 'error',
        });
        flag = true;
      }
    });
    if (flag) return;

    try {
      await axios.post('/api/artist/update', {
        id: router.query.artistId,
        albums: { ...state },
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
      <Typography variant='h4' gutterBottom>
        Add Album
      </Typography>
      <AlbumField
        state={state}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Layout>
  );
}
