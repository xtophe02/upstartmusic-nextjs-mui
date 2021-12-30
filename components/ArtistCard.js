import {
  Stack,
  Box,
  Typography,
  Grid,
  Table,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { padding } from '@mui/system';
import Image from 'next/image';
import AlbumCard from './AlbumCard';

export default function BasicList({ data }) {
  const {
    age,
    albums,
    genre,
    image,
    labelName,
    name,
    netWorth,
    retired,
    website,
    yearsActive,
  } = data;

  return (
    <Grid
      container
      sx={{ width: '100%', bgcolor: 'background.paper', marginTop: '2rem' }}
      spacing={2}
    >
      <Grid item xs={12} md={6}>
        <Image
          src={image}
          alt={name}
          layout='responsive'
          height={50}
          width={50}
          placeholder='blur'
          blurDataURL='data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack spacing={2}>
          <Typography variant='h3'>{name}</Typography>
          <Typography variant='h5'>{labelName}</Typography>
          <Table size='small'>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography variant='h5'>{yearsActive}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='h6' sx={{ fontStyle: 'italic' }}>
                    Years Active
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant='h5'>{age}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='h6' sx={{ fontStyle: 'italic' }}>
                    Years Old
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant='h5'>
                    ${netWorth.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='h6' sx={{ fontStyle: 'italic' }}>
                    Net Worth
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant='h5'>{genre}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='h6' sx={{ fontStyle: 'italic' }}>
                    Music Genre
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant='h5'>{website}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='h6' sx={{ fontStyle: 'italic' }}>
                    WebSite
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant='h5'>{retired ? 'Yes' : 'No'}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='h6' sx={{ fontStyle: 'italic' }}>
                    Retired?
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h4' gutterBottom>
          Albuns
        </Typography>
        <Grid container spacing={2}>
          {albums.length > 0 ? (
            albums.map((album) => (
              <Grid item key={album._id || album.title} xs={12} md={4}>
                <AlbumCard data={album} />
              </Grid>
            ))
          ) : (
            <Typography>
              No albuns added... please to edit the profile to add albuns
            </Typography>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
