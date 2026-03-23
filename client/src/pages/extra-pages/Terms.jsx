import { Typography, Stack } from '@mui/material';
import MainCard from 'components/MainCard';

export default function Terms() {
  return (
    <MainCard title="Terms & Conditions">
      <Stack spacing={2}>
        <Typography variant="body1">
          By using Future Home, you agree to use the system responsibly and only for project/demo purposes.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          All content is provided “as-is” for educational use.
        </Typography>
      </Stack>
    </MainCard>
  );
}
