import React from 'react';
import './styles.scss';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';

const Home = () => {
  return (
    <React.Fragment>
      <Typography variant="h3" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
      <Button>Hello world</Button>
    </React.Fragment>
  );
};

export default Home;
