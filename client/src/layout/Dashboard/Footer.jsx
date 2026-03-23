// material-ui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';


// ==============================|| FOOTER ||============================== //

export default function Footer() {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      sx={{ gap: 1.5, alignItems: 'center', justifyContent: 'space-between', p: '24px 16px 0px', mt: 'auto' }}
    >
      <Typography variant="caption">
        © {new Date().getFullYear()} Future Home. All rights reserved.
      </Typography>

      <Stack direction="row" sx={{ gap: 1.5, alignItems: 'center' }}>
        <Link component={RouterLink} to="about" underline="hover" variant="caption" color="text.primary">
          About us
        </Link>
        <Link component={RouterLink} to="privacy" underline="hover" variant="caption" color="text.primary">
          Privacy
        </Link>
        <Link component={RouterLink} to="terms" underline="hover" variant="caption" color="text.primary">
          Terms
        </Link>
      </Stack>
    </Stack>
  );
}

