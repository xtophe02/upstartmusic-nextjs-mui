import * as React from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Typography from '@mui/material/Typography';

import Image from 'next/image';
import { Stack } from '@mui/material';

export default function MediaControlCard({ artist }) {
  const { image, name, labelName, albums, age, yearsActive, retired } = artist;

  return (
    <Card
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        height: '11rem',
        backgroundColor: retired ? 'text.disabled' : 'paper',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
        }}
      >
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component='div' variant='h5'>
            {name}
          </Typography>
          <Typography
            variant='subtitle1'
            color='text.secondary'
            component='div'
          >
            {labelName}
          </Typography>
        </CardContent>
        <Stack sx={{ display: 'flex', pl: 2, pb: 1 }}>
          <Typography variant='caption'>Age:&nbsp;{age}</Typography>
          <Typography variant='caption'>
            Years Active:&nbsp;{yearsActive}
          </Typography>

          <Typography variant='caption'>
            NºAlbuns:&nbsp;{albums.length}
          </Typography>
        </Stack>
      </Box>
      <CardMedia sx={{ width: 151, position: 'relative' }}>
        <Image
          src={image}
          alt={name}
          layout='fill'
          placeholder='blur'
          blurDataURL='data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
        />
      </CardMedia>
    </Card>
  );
}
