import { client, stopQuery } from './../utils/graphQL'

interface ChosenStopName {
  chosenStopName: string;
}

interface Vehicle {
  serviceDay: number;
  scheduledArrival: number;
  realtime: Boolean;
  realtimeArrival: number;
  arrivalDelay: number;
  scheduledDeparture: number;
  realtimeDeparture: number;
  departureDelay: number;
  line: string;
  route: string;
  trip?: any;
}

interface Stop {
  name: string;
  code: string;
  vehicles: Vehicle[];
  stoptimesWithoutPatterns?: any;
}

export const getVehicles: Stop[] | any = async (chosenStopName: ChosenStopName) => {

  const result = await client().query({ query: stopQuery(chosenStopName) })
  console.log('QUERY RESULT', result.data.stops)
  return result.data.stops.map((stop: Stop) => {
    const { name, code } = stop
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
        }
      })
    }
  })
}