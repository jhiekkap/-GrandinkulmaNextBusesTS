
import { Vehicle } from '../types'

export const getTime = (date: Date) => date.toString().split(' ')[4];

export const delayToString = (delay: number) => {
    const delayAbs = Math.abs(delay);
    let minutes: string = (Math.floor(delayAbs / 60)).toString();
    minutes = parseInt(minutes) === 0 ? '00' : (parseInt(minutes) < 10 ? '0' + minutes : minutes);
    const seconds = delayAbs < 10 ? '0' + delayAbs : delayAbs > 59 ? (delayAbs % 60 < 10 ? '0' + delayAbs % 60 : delayAbs % 60) : delayAbs;
    return `${delay < 0 ? '+' : ''}${minutes}:${seconds}`;
}

export const parseVehicle = (vehicle: Vehicle) => {

    const { serviceDay, line, route, realtime, direction } = vehicle;
    const sortedRoute = direction ? route.split('-').reverse().join('-') : route;
    const serviceDayInMs = serviceDay * 1000;
    const scheduledArrival = getTime(new Date(serviceDayInMs + vehicle.scheduledArrival * 1000));
    //console.log('SCHEDULED ARRIVAL', scheduledArrival);
    const realtimeArrival = getTime(new Date(serviceDayInMs + vehicle.realtimeArrival * 1000));
    //console.log('REAL TIME ARRIVAL', realtimeArrival);
    const arrivalDelay = delayToString(vehicle.arrivalDelay);
    //console.log('ARRIVAL DELAY ', arrivalDelay);
    const scheduledDeparture = getTime(new Date(serviceDayInMs + vehicle.scheduledDeparture * 1000));
    //console.log('SCHEDULED DEPARTURE', scheduledDeparture);
    const realtimeDeparture = getTime(new Date(serviceDayInMs + vehicle.realtimeDeparture * 1000));
    //console.log('REAL TIME DEPARTURE', realtimeDeparture);
    const departureDelay = delayToString(vehicle.departureDelay);
    return { line, sortedRoute, realtime, scheduledArrival, realtimeArrival, arrivalDelay, scheduledDeparture, realtimeDeparture, departureDelay }
}