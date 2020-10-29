import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client';
import { Vehicle, Stop } from '../types'

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
  })
});

export const STOP_QUERY = gql`
query stopQuery($name: String!) { 
  stops(name: $name) { 
    name
    code 
     stoptimesWithoutPatterns {
      scheduledArrival
      realtimeArrival
      arrivalDelay
      scheduledDeparture
      realtimeDeparture
      departureDelay
      realtime 
      serviceDay 
      realtimeArrival
      trip{
        pattern{
          directionId
        }
        route{
          longName
        } 
        routeShortName
      } 
    }
  }
} 
`;

export const parseQuery = (data: any) => {
  return data.stops.map((stop: Stop) => {
    const { name, code } = stop;
    //console.log('STOPPI', stop)
    return {
      name,
      code,
      vehicles: stop.stoptimesWithoutPatterns.map((vehicle: Vehicle) => {
        const { serviceDay, scheduledArrival, realtime, realtimeArrival, arrivalDelay,
          scheduledDeparture, realtimeDeparture, departureDelay, trip } = vehicle
        //console.log('VEHICLE', vehicle)
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
          route: trip.route.longName,
          direction: trip.pattern ? trip.pattern.directionId : undefined
        };
      })
    };
  });
}
