import React from 'react';
import ReactDOM from 'react-dom';
import Home from './home.jsx';
import Compost from './components/compost.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'typeface-roboto';

const Index = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/page/:id" component={Compost} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
};

ReactDOM.render(<Index />, document.getElementById('root'));
