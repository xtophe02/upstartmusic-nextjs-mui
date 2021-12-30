import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';

import Link from '../src/Link';

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography
            variant='h4'
            sx={{ flexGrow: 1, color: 'white', textDecoration: 'none' }}
            component={Link}
            href='/'
            noLinkStyle
          >
            UpStar Music
          </Typography>
          {/* <Button color='inherit'>Random Artist</Button> */}
          <Button color='inherit' component={Link} href='/create-artist'>
            Create Artist
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
