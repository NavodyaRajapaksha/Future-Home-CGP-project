import { useState } from 'react';

// material-ui
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography
} from '@mui/material';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    alert(`Password reset link sent to ${email}`);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
      <Grid item xs={11} sm={6} md={4}>
        <Card sx={{ p: 2 }}>
          <CardContent>
            <Stack spacing={3}>
              <Typography variant="h3" textAlign="center">
                Forgot Password
              </Typography>

              <Typography variant="body2" textAlign="center" color="text.secondary">
                Enter your email and we will send you a password reset link.
              </Typography>

              <TextField
                fullWidth
                label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Button
                fullWidth
                variant="contained"
                onClick={handleSubmit}
              >
                Send Reset Link
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}