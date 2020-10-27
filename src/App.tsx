import React  from 'react';
import './App.css'; 
import TimeTable from './components/TimeTable';
 
const App: React.FC = () => {
 
  return (
    <div className="App">
      <h1>PYSÄKKIHAKU</h1>
      <TimeTable />
    </div>
  );
}

export default App;
