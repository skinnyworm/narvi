import React from 'react';
import {
  Box,
  Typography,
  Container,
  Divider,
  IconButton as MuiIconButton,
  IconButtonProps,
  Avatar,
  Link,
  Stack,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';

const IconButton = (props: IconButtonProps) => {
  const { children, ...other } = props;
  return (
    <MuiIconButton {...other}>
      <Avatar sx={{ backgroundColor: 'rgba(255,255,255,.7)', color: 'primary.main' }}>{children}</Avatar>
    </MuiIconButton>
  );
};

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        bgcolor: 'primary.dark',
        color: 'primary.light',
        '& a': {
          color: 'primary.light',
        },
      }}>
      <Container sx={{ my: 2 }}>
        <Stack direction="row" spacing={2} justifyContent="center" mb={2}>
          <Link href="/term-of-use">Term of use</Link>
          <Link href="/privacy">Privacy policy</Link>
        </Stack>

        <Stack direction="row" spacing={2} justifyContent="center" mb={2}>
          <IconButton>
            <EmailIcon />
          </IconButton>
          <IconButton>
            <TwitterIcon />
          </IconButton>
          <IconButton>
            <FacebookIcon />
          </IconButton>
        </Stack>
        <Divider sx={{ borderColor: 'rgba(255,255,255,.3)', my: 2 }} />
        <Typography variant="caption" align="center" paragraph>
          Copyright © 2022 University of Tasmania
        </Typography>
      </Container>
    </Box>
  );
}
