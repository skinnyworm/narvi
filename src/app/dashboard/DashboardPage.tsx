import React from 'react';
import { Container, IconButton, Toolbar, Grid, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { AppPage, Main } from 'components/layout';
import { useNavigate } from 'react-router';
import { WidgetCard } from './WidgetCard';
import { useAppSelector } from 'app/store';
import { Box } from '@mui/system';

export function DashboardPage() {
  const navigate = useNavigate();
  const widgets = useAppSelector((state) => state.dashboard.widgets);

  return (
    <AppPage
      title="Dashboard"
      actions={
        <IconButton color="inherit" onClick={() => navigate('new')}>
          <AddIcon />
        </IconButton>
      }>
      <Main>
        <Toolbar />
        <Container component="article">
          <Grid sx={{ mt: 2 }} container spacing={2}>
            {widgets.map((widget) => (
              <WidgetCard key={widget.id} widget={widget} />
            ))}
          </Grid>
        </Container>
        <Box
          mt={6}
          height={200}
          component="footer"
          bgcolor="#333"
          color="#FFF"
          display="flex"
          alignItems="flex-end"
          justifyContent="center"
          p={4}>
          <Typography variant="body2" color="inherit">
            ©2021 Copyright by Skinnyworm
          </Typography>
        </Box>
      </Main>
    </AppPage>
  );
}
