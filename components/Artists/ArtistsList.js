import { Grid } from '@mui/material';
import Link from '../../src/Link';
import CardArtist from './CardArtist';
export default function ArtistsList({ data }) {
  return (
    <Grid container spacing={2}>
      {data.map((artist) => (
        <Grid item key={artist._id} xs={12} md={6}>
          <Link
            href={`/artist/${artist._id}`}
            variant='inherit'
            underline='none'
          >
            <CardArtist artist={artist} />
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}
