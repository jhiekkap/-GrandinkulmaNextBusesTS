import React, { useState, useEffect } from 'react';
import './App.css';
import { getVehicles } from './service'
import { useInterval } from './utils/hooks';
import TimeTable from './components/TimeTable';
import StopSearch from './components/StopSearch'; 

const App: React.FC = () => {
  
  const [chosenStops, setChosenStops] = useState([])
  const [chosenStopName, setChosenStopName] = useState('Grandinkulma')

  useInterval(() => {
    getNextVehicles()
  }, 10000)

  useEffect(() => {
    getNextVehicles()
  }, [chosenStopName])

  const getNextVehicles = async () => {
    try {
      const result = await getVehicles(chosenStopName)
      console.log('GET VEHICLES RESULT', result)
      setChosenStops(result) 
    } catch (error) {
      console.log('GRAPHQL ERROR', error)
    }
  }

  return (
    <div className="App">
      <h2>{`Pysäkkihaun "${chosenStopName}"  tulo- ja lähtöajat`}</h2>
      <TimeTable chosenStops={chosenStops} />
      <StopSearch setChosenStopName={setChosenStopName} />
    </div>
  );
}

export default App;
