import React from 'react';
import ReactDOM from 'react-dom';
import Home from './home.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Index = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>

    </div>
  );
};

ReactDOM.render(<Index />, document.getElementById('root'));
