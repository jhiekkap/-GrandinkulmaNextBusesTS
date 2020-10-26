import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client';
import { Vehicle, Stop } from '../../types'

export const client = () => new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
  })
});

export const STOP_QUERY =  gql`
query stopQuery($name: String!) { 
  stops(name: $name) {
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
`; 

export const parseQuery = (data: any) => {
  return data.stops.map((stop: Stop) => {
      const { name, code } = stop;
      return {
          name,
          code,
          vehicles: stop.stoptimesWithoutPatterns.map((vehicle: Vehicle) => {
              const { serviceDay, scheduledArrival, realtime, realtimeArrival, arrivalDelay,
                  scheduledDeparture, realtimeDeparture, departureDelay, trip } = vehicle
              return {
                  serviceDay,
                  scheduledArrival,
                  realtime,
                  realtimeArrival,
                  arrivalDelay,
                  scheduledDeparture,
                  realtimeDeparture,
                  departureDelay,
                  line: trip.routeShortName,
                  route: trip.route.longName
              };
          })
      };
  });
}
