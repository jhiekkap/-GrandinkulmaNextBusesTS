import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import SearchResults from './SearchResults';
import { MockedProvider } from '@apollo/client/testing';
import { STOP_QUERY } from '../graphQL' 
import { prettyDOM } from '@testing-library/dom'



const norotieResult = {
  stops: [
    {
      code: "V1530",
      name: "Norotie",
      stoptimesWithoutPatterns: [
        {
          arrivalDelay: 165,
          departureDelay: 165,
          realtime: true,
          realtimeArrival: 32385,
          realtimeDeparture: 32385,
          scheduledArrival: 32220,
          scheduledDeparture: 32220,
          serviceDay: 1604008800,
          trip: {
            pattern: {
              directionId: 0
            },
            route: {
              longName: "Elielinaukio-Martinlaakso-Kalajärvi"
            },
            routeShortName: "436"
          }
        }
      ]
    }
  ]
}

it('should render 1st bus in Norotie stop', async () => {
  const norotieMock = {
    request: {
      query: STOP_QUERY,
      variables: { name: 'Norotie' },
    },
    result: norotieResult
  };

  const component = render(
    <MockedProvider mocks={[norotieMock]} addTypename={false}>
      <SearchResults query='Norotie' />
    </MockedProvider>,
  );

  //await new Promise(resolve => setTimeout(resolve, 0)); // wait for response
  //console.log('COMPONENT', component);
 
  const body = component.container.querySelector('body')
  console.log(prettyDOM(body))
  //component.debug()
  expect(component.container).toHaveTextContent(
    'Loading...'
  );

});