import React from 'react';
import ReactDOM from 'react-dom';
import Home from './home.jsx';
import Compost from './components/compost.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme, CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

import 'typeface-roboto';
const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const Index = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <Router>
          <Switch>
            <Route path="/page/:id" component={Compost} />
            <Route path="/" component={Home} />
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
};

ReactDOM.render(<Index />, document.getElementById('root'));
