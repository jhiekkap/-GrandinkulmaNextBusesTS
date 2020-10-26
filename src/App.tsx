import React, { useState, useEffect } from 'react';
import './App.css';
import { getVehicles } from './service';
import { useInterval } from './utils/hooks';
import TimeTable from './components/TimeTable';


const App: React.FC = () => {

  const [chosenStops, setChosenStops] = useState([]);
  const [chosenStopName, setChosenStopName] = useState('Tikkurila');

  /* useInterval(() => {
    getNextVehicles();
  }, 10000); */

  /* useEffect(() => {
    getNextVehicles();
  }, [chosenStopName]); */

  const getNextVehicles: () => Promise<void> = async () => {
    try {
      const result: any = await getVehicles(chosenStopName);
      console.log('GET VEHICLES RESULT', result);
      setChosenStops(result);
    } catch (error) {
      console.log('GRAPHQL ERROR', error);
    }
  }

  return (
    <div className="App">
      <TimeTable /* chosenStops={chosenStops} setChosenStops={setChosenStops} chosenStopName={chosenStopName} setChosenStopName={setChosenStopName}  *//>
    </div>
  );
}

export default App;
