import React from 'react';
import ReactDOM from 'react-dom';
import Home from './home.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'typeface-roboto';

const Index = () => {
  return (
    <div>
      <Router>
        <div>
          <Link to="/compost">Compost</Link>
        </div>
        <div>
          <Link to="/camp">Camp</Link>
        </div>
        <Switch>
          <Route path="/compost">
            <Compost />
          </Route>
          <Route path="/camp">
            <Camp />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

ReactDOM.render(<Index />, document.getElementById('root'));
