import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client';

export const client = () => new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
    })
});

export const stopQuery = (chosenStopName: string) => gql`
{
  stops(name: "${chosenStopName}") {
    gtfsId
    name
    code
    lat
    lon
     stoptimesWithoutPatterns {
      scheduledArrival
      realtimeArrival
      arrivalDelay
      scheduledDeparture
      realtimeDeparture
      departureDelay
      realtime
      realtimeState
      serviceDay
      headsign
      realtimeArrival
      trip{
        route{
          longName
        }
        tripShortName
        routeShortName
      } 
    }
  }
}
`