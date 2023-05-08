import { Link } from 'react-router-dom';
import { ReactComponent as LogoDark } from 'src/assets/images/logos/dark-logo.svg';
import { styled } from '@mui/material';

const LinkStyled = styled(Link)(() => ({
  height: '70px',
  width: '180px',
  overflow: 'hidden',
  display: 'block',
}));

const Logo = () => {
  return (
    <div className="d-flex">
      <LinkStyled to="/" style={{ width: 100 }}>
        <LogoDark height={70} />
      </LinkStyled>
      <div>
        <h3 className="mb-0 mt-1">CSEDU</h3>
        <h6 style={{ letterSpacing: 2 }}>CONNECT</h6>
      </div>
    </div>
  );
};

export default Logo;
