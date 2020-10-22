import { client, stopQuery } from './../utils/graphQL'


export const getVehicles =  async (chosenStopName) => {

    const result = await client().query({ query: stopQuery(chosenStopName) })
    console.log('QUERY RESULT', result.data.stops) 
    return result.data.stops.map(stop => {
      const { name, code } = stop
      return {
        name,
        code,
        vehicles: stop.stoptimesWithoutPatterns.map(vehicle => {
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