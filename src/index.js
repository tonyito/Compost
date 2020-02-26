import React from 'react';
import ReactDOM from 'react-dom';
import Home from './home.jsx';
import Compost from "./components/compost.jsx"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'typeface-roboto';

const Index = () => {
  return (
    <div>
      <Router>
        <Route path="/compost" component={Compost} />
      </Router>
    </div>
  );
};

ReactDOM.render(<Index />, document.getElementById('root'));
