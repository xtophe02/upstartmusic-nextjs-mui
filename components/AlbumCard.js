import * as React from 'react';
import Image from 'next/image';
import EventIcon from '@mui/icons-material/Event';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {
  List,
  ListItemText,
  ListItem,
  ListItemAvatar,
  Avatar,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';

export default function MediaCard({ data }) {
  const { title, date, copiesSold, numberTracks, image, revenue } = data;
  return (
    <Card sx={{ minWidth: 300 }}>
      <CardMedia>
        <Image
          src={image}
          layout='responsive'
          alt={title}
          width={300}
          height={200}
          placeholder='blur'
          blurDataURL='data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
        />
      </CardMedia>
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {title}
        </Typography>
        <List dense>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <EventIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              secondary={new Date(date).toLocaleDateString('en-EN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
              primary='Release Date'
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AudiotrackIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText secondary={numberTracks} primary='Number Tracks' />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <FileCopyIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText secondary={copiesSold} primary='Copies Sold' />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AttachMoneyIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              secondary={`$${revenue
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
              primary='Revenue'
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}
