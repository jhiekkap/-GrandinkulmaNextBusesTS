import React, { useState, useEffect } from 'react';
import './App.css';
import { getVehicles } from './service';
import { useInterval } from './utils/hooks';
import TimeTable from './components/TimeTable';
import StopSearch from './components/StopSearch';
import { useMediaQuery } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

const App: React.FC = () => {

  const [chosenStops, setChosenStops] = useState([]);
  const [chosenStopName, setChosenStopName] = useState('Grandinkulma');
  const theme: Theme = useTheme();
  const isMobile: Boolean = useMediaQuery(theme.breakpoints.down('sm'));

  useInterval(() => {
    getNextVehicles();
  }, 10000);

  useEffect(() => {
    getNextVehicles();
  }, [chosenStopName]);

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
      <h4>{`Pysäkkihaun "${chosenStopName}"  tulo${!isMobile ? '- ja lähtö' : ''}ajat`}</h4>
      <StopSearch setChosenStopName={setChosenStopName} />
      <TimeTable chosenStops={chosenStops} />
    </div>
  );
}

export default App;
