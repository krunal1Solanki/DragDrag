import React from 'react';
import Header from './Components/Header';
import Layout from './Components/Layout';

const App = () => {
  return (
    <div>
      <Header />
      <div className="wrapper">
        <Layout />
      </div>
    </div>
  );
};

export default App;
