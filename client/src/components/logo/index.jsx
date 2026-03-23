import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// material-ui
import ButtonBase from '@mui/material/ButtonBase';

// project imports
import Logo from './LogoMain';
import LogoIcon from './LogoIcon';
import { APP_DEFAULT_PATH } from 'config';

// ==============================|| MAIN LOGO ||============================== //

export default function LogoSection({ reverse, isIcon, sx, to }) {
  return (
    <ButtonBase disableRipple component={Link} to={to || APP_DEFAULT_PATH} sx={sx} aria-label="Logo">
      {isIcon ? (
        <LogoIcon sx={{ width: 40, height: 40 }} />
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
         <LogoIcon sx={{ width: 40, height: 40 }} />
         <span style={{ fontWeight: 700, fontSize: 18 }}>Future Home</span>
        </div>
      )}

    </ButtonBase>
  );
}

LogoSection.propTypes = { reverse: PropTypes.bool, isIcon: PropTypes.bool, sx: PropTypes.any, to: PropTypes.any };
