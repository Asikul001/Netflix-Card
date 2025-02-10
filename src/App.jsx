import React from 'react';
import data from '../data/data';
import Card from './components/Card'
import "../src/App.css"
const App=()=>
{
  return (
    <div className='card-parents' style={{backgroundImage:"url('http://localhost:5173/src/assets/bg.jpg')"}} >
      {
        data.map((hold)=><Card key={hold.title} send={hold}/>)
      }
      </div> 
  );
};
export default App;