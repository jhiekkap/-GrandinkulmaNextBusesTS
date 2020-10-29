import React, { useState } from 'react';
import './App.css';
import TimeTable from './components/TimeTable';
import StopSearch from './components/StopSearch';
import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

const App: React.FC = () => {

  const [stopName, setStopName] = useState('Grandinkulma');
  const theme: Theme = useTheme();
  const isMobile: Boolean = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className="App">
      <h1>PYSÄKKIHAKU</h1>
      <h4>{`Haun "${stopName}"  tulo${!isMobile ? '- ja lähtö' : ''}ajat`}</h4>
      <StopSearch setStopName={setStopName} />
      <TimeTable stopName={stopName} />
    </div>
  );
}

export default App;
