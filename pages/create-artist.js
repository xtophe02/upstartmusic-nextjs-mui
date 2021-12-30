import { Typography, Button } from '@mui/material';
import Layout from '../components/Layout';
import { useContext, useState } from 'react';
import Link from '../src/Link';
import axios from 'axios';
import NotificationContext from '../store/notification-context';
import { useRouter } from 'next/router';
import ArtistForm from '../components/Artist/ArtistForm';

const initValues = {
  name: '',
  age: 0,
  yearsActive: 0,
  image: '',
  genre: '',
  website: '',
  netWorth: 0,
  labelName: '',
  retired: false,
  numAlbuns: 0,
  albuns: [],
};

export default function CreateArtistPage() {
  const [state, setState] = useState(initValues);
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
      await axios.post('/api/artist/save', {
        ...state,
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
        Create Artist{' '}
        <Button component={Link} href='/random-artist'>
          Create Random Artist
        </Button>
      </Typography>
      <ArtistForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        state={state}
      />
    </Layout>
  );
}
