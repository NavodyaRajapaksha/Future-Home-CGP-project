import { Typography, Stack } from '@mui/material';
import MainCard from 'components/MainCard';

export default function Privacy() {
  return (
    <MainCard title="Privacy Policy">
      <Stack spacing={2}>
        <Typography variant="body1">
          We only collect information needed to operate Future Home features (e.g., accounts, properties, projects, inquiries).
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This is a university project demo. No real personal data should be used.
        </Typography>
      </Stack>
    </MainCard>
  );
}
