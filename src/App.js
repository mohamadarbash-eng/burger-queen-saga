import React, { Component } from 'react';

import Layout from './components/Layout/Layout';
import BurgerQueen from './containers/BurgerQueen/BurgerQueen';

class App extends Component {
  render () {
    return (
      <div>
        <Layout>
          <BurgerQueen />
        </Layout>
      </div>
    );
  }
}

export default App;
