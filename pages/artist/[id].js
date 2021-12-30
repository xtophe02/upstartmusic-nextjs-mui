import Layout from '../../components/Layout';
import axios from 'axios';
import ArtistCard from '../../components/ArtistCard';
import { Button, Box } from '@mui/material';
import { red } from '@mui/material/colors';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import NotificationContext from '../../store/notification-context';

export default function SlugPage({ data }) {
  const router = useRouter();
  const notificationCtx = useContext(NotificationContext);
  const deleteArtist = async (id) => {
    try {
      await axios.delete(`/api/artist/delete/${id}`);
      notificationCtx.showNotification({
        title: 'Successful deleted on database',
        message:
          'This is a static web site revalidated every 10 seconds. meaning that this page will be re-builded after 10 seconds with the lattest data from database',
        status: 'info',
      });
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Box>
        <Button color='secondary' onClick={() => router.back()}>
          back
        </Button>
        <Button
          color='primary'
          onClick={() => router.push(`/edit-artist?id=${router.query.id}`)}
        >
          edit
        </Button>
        <Button
          sx={{
            color: red[500],
            '&:hover': {
              backgroundColor: red[700],
              color: 'white',
            },
          }}
          onClick={() => deleteArtist(router.query.id)}
        >
          delete
        </Button>
      </Box>
      <ArtistCard data={data} />
    </Layout>
  );
}
export async function getStaticPaths() {
  // const paths = data.products.map((product) => ({
  //   params: { slug: product.slug },
  // }));
  const { data } = await axios.get(`${process.env.API_URL}/api/artists`);
  const paths = data.total.map(({ _id }) => ({ params: { id: _id } }));
  return {
    paths,
    fallback: 'blocking', // See the "fallback" section below
  };
}

export async function getStaticProps(context) {
  const { data } = await axios.get(
    `${process.env.API_URL}/api/artists/${context.params.id}`
  );
  return {
    props: { data },
    revalidate: 10,
  };
}
