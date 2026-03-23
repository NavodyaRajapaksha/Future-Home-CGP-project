import { Typography, Stack, Divider } from '@mui/material';
import MainCard from 'components/MainCard';

export default function AboutUs() {
  return (
    <MainCard title="About Future Home">
      <Stack spacing={2}>
        <Typography variant="body1">
          Future Home is a construction & real-estate management platform to manage properties, projects, tasks, materials, and client inquiries.
        </Typography>
        <Divider />
        <Typography variant="body2" color="text.secondary">
          Version: 1.0
        </Typography>
      </Stack>
    </MainCard>
  );
}
