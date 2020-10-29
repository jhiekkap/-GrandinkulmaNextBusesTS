import React from 'react';
import { useStateValue } from "./state";
import SearchResults from './components/SearchResults';
import StopSearch from './components/StopSearch';
import { useMediaQuery, Container } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';


const App: React.FC = () => {

  const [{ stopName }] = useStateValue();
  const theme: Theme = useTheme();
  const isMobile: Boolean = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container maxWidth='md'>
      <h1>PYSÄKKIHAKU</h1>
      <h4>{`Haun "${stopName}"  tulo${!isMobile ? '- ja lähtö' : ''}ajat`}</h4>
      <StopSearch />
      <SearchResults />
    </Container>
  );
}

export default App;
