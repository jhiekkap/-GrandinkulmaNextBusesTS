/* interface Vehicle {
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
} */
/* 
interface Stop {
    name: string;
    code: string;
    vehicles: Vehicle[];
} */

export interface Vehicle {
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
  
  export interface Stop {
    name: string;
    code: string;
    vehicles: Vehicle[];
    stoptimesWithoutPatterns?: any;
  }
