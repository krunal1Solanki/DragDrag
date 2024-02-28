import React, { useEffect, useState } from 'react';
import Header from './Components/Header';
import Layout from './Components/Layout';
import axios from 'axios';

const App = () => {
  
  const [updateCount, setUpdateCount] = useState(0);
  const [components, setComponents] = useState([]);
  const [componentCount, setComponentCount] = useState(0);
  
  useEffect(()=> {
    getData();
    fetchCounter()
  }, [])

  const getData = async () => {
    const data = await axios.get('https://enchanting-gaiters-fly.cyclic.app/api/getComponents');
    console.log(data.data.info)
    setComponents(data.data.info)
  }
  const fetchCounter = async () => {
    try {
      const info = await axios.get('https://enchanting-gaiters-fly.cyclic.app/api/getCounter');
      console.log("INFOOOO",info.data.info[0])
      setUpdateCount(info.data.info[0].updateCount);
      setComponentCount(info.data.info[0].componentCount)
    } catch (error) {
      window.prompt(error.message)
    }
  }
  
  return (
    <div>
      <Header setUpdateCount={setUpdateCount} setComponentCount={setComponentCount}  updateCount={updateCount} componentCount={componentCount} getData={getData} fetchCounter={fetchCounter} />
      <div className="wrapper">
        <Layout setUpdateCount={setUpdateCount} setComponentCount={setComponentCount} components={components}  setComponents={setComponents} updateCount={updateCount} componentCount={componentCount}/>
      </div>
    </div>
  );
};

export default App;
