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
    direction: number | undefined;
}

export interface Stop {
    name: string;
    code: string;
    vehicles: Vehicle[];
    stoptimesWithoutPatterns?: any;
}
