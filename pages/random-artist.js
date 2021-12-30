import { Stack, Button, CircularProgress } from '@mui/material';

import Layout from '../components/Layout';
import { createArtist } from '../lib/seed_helper';

import { imageUnsplash } from '../lib/unsplash_generator';
import ArtistCard from '../components/ArtistCard';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useState, useContext } from 'react';
import NotificationContext from '../store/notification-context';

export default function RandomArtistPage({ artist }) {
  const [loading, setLoading] = useState(false);
  const notificationCtx = useContext(NotificationContext);

  const router = useRouter();
  const saveArtist = async (data) => {
    try {
      setLoading(true);
      await axios.post('/api/artist/save', {
        ...data,
      });
      notificationCtx.showNotification({
        title: 'Successful saved on database',
        message:
          'This is a static web site revalidated every 10 seconds. meaning that this page will be re-builded after 10 seconds with the lattest data from database',
        status: 'success',
      });
      setLoading(false);
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Stack spacing={2} direction='row'>
        <Button variant='contained' onClick={() => router.back()}>
          go back
        </Button>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => saveArtist(artist)}
        >
          {' '}
          {loading ? <CircularProgress size={20} color='error' /> : 'save'}
        </Button>{' '}
      </Stack>

      <ArtistCard data={artist} />
    </Layout>
  );
}

export async function getStaticProps(context) {
  const artist = createArtist();
  const { data } = await imageUnsplash('person', '1');
  const { data: data2 } = await imageUnsplash('minimal', artist.albums.length);
  artist.image = data[0].urls.regular;

  artist.albums.forEach((album, i) => {
    album.image = data2[i].urls.regular;
  });

  const artistJSON = JSON.stringify(artist);

  return {
    props: { artist: JSON.parse(artistJSON) },
  };
}
