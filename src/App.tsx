import React from 'react';
import { useStateValue } from "./state";
import SearchResults from './components/SearchResults';
import StopSearch from './components/StopSearch';
import { useMediaQuery, Container  } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

const App: React.FC = () => {

  const [{ stopName }] = useStateValue();
  const theme: Theme = useTheme();
  const isMobile: Boolean = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container maxWidth='md'>
      <h3>PYSÄKKIHAKU</h3>
      <StopSearch /> 
      <h4>{`Haun "${stopName}" pysäkit ja tulo${!isMobile ? '- ja lähtö' : ''}ajat:`}</h4>
      <SearchResults />
    </Container>
  );
}

export default App;
