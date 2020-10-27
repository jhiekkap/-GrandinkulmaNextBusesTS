import React, { useEffect, useState } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client'
import { STOP_QUERY, parseQuery } from '../graphQL'
import StopSearch from './StopSearch';
import { getTime, delayToString } from '../utils';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Stop } from '../types';
import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { Vehicle } from '../types'

interface VehicleVars {
    name: string;
}

const TimeTable: React.FC = () => {

    const [stops, setStops] = useState<Stop[]>([]);
    const [stopName, setStopName] = useState('Grandinkulma');
    const initialStopQuery = useQuery<Vehicle, VehicleVars>(
        STOP_QUERY,
        {
            variables: {
                name: stopName
            },
            pollInterval: 5000
        });
    const [getStopsQuery, updatedStops] = useLazyQuery<Vehicle, VehicleVars>(STOP_QUERY);
    const theme: Theme = useTheme();
    const isMobile: Boolean = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        if (updatedStops.data) {
            setStops(parseQuery(updatedStops.data));
        }
    }, [updatedStops]);

    useEffect(() => {
        if (initialStopQuery.data) {
            setStops(parseQuery(initialStopQuery.data));
        }
    }, [initialStopQuery]);

    const getStopsByName = (name: string) => {
        getStopsQuery({ variables: { name } });
    }

    console.log('CHOSEN STOPS', stops);


    return <div className='timetableContainer'>
        <h4>{`Pysäkkihaun "${stopName}"  tulo${!isMobile ? '- ja lähtö' : ''}ajat`}</h4>
        <StopSearch setStopName={setStopName} getStopsByName={getStopsByName} />
        {stops.length > 0 ? <div>
            {stops.map((stop: Stop, s) => {
                const isRealTime: Boolean = Boolean(stop.vehicles.find(vehicle => vehicle.realtime));
                const hasVehicles: Boolean = stops.length > 0 && stops[0].vehicles.length > 0;

                return (
                    <div className='timetable' key={s}>
                        {stops.length === 2
                            && (s === 0 ? <ArrowForwardIcon /> : <ArrowBackIcon />)}
                        {hasVehicles ? <div>{`${stop.name} ${stop.code}`}</div> : <div>Ei tulevia lähtöjä</div>}
                        {hasVehicles &&
                            <table >
                                <thead>
                                    <tr>
                                        <td>
                                            Linja
                                    </td>
                                        <td>
                                            Reitti
                                    </td>
                                        {!isMobile && <td>
                                            Reaaliaikainen saapumistieto
                                    </td>}
                                        {!isMobile && <td>
                                            Aikataulun mukainen tuloaika
                                    </td>}
                                        {isRealTime && !isMobile && <td>
                                            Arvioitu tuloaika
                                    </td>}
                                        {isRealTime && !isMobile && <td>
                                            Tuloaika myöhässä
                                    </td>}
                                        {!isMobile && <td>
                                            Aikataulun mukainen lähtöaika
                                    </td>}
                                        {isRealTime && !isMobile && <td>
                                            Arvioitu lähtöaika
                                    </td>}
                                        {isRealTime && !isMobile && <td>
                                            Lähtöaika myöhässä
                                    </td>}
                                        {isMobile && <td>
                                            Tuloaika
                                    </td>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {stop.vehicles.map((vehicle, i) => {
                                        const { serviceDay, line, route, realtime, direction } = vehicle;
                                        const sortedRoute = direction ? route.split('-').reverse().join('-') : route;
                                        const serviceDayInMs = serviceDay * 1000;
                                        const scheduledArrival = getTime(new Date(serviceDayInMs + vehicle.scheduledArrival * 1000).toString());
                                        //console.log('SCHEDULED ARRIVAL', scheduledArrival);
                                        const realtimeArrival = getTime(new Date(serviceDayInMs + vehicle.realtimeArrival * 1000).toString());
                                        //console.log('REAL TIME ARRIVAL', realtimeArrival);
                                        const arrivalDelay = delayToString(vehicle.arrivalDelay);
                                        //console.log('ARRIVAL DELAY ', arrivalDelay);
                                        const scheduledDeparture = getTime(new Date(serviceDayInMs + vehicle.scheduledDeparture * 1000).toString());
                                        //console.log('SCHEDULED DEPARTURE', scheduledDeparture);
                                        const realtimeDeparture = getTime(new Date(serviceDayInMs + vehicle.realtimeDeparture * 1000).toString());
                                        //console.log('REAL TIME DEPARTURE', realtimeDeparture);
                                        const departureDelay = delayToString(vehicle.departureDelay);
                                        //console.log('DEPARTURE DELAY ', departureDelay);

                                        return <tr key={i}>
                                            <td>
                                                {line}
                                            </td>
                                            <td>
                                                {sortedRoute}
                                            </td>
                                            {!isMobile && <td>
                                                {realtime ? 'KYLLÄ' : 'EI'}
                                            </td>}
                                            {!isMobile && <td>
                                                {scheduledArrival}
                                            </td>}
                                            {isRealTime && !isMobile && <td>
                                                {realtimeArrival}
                                            </td>}
                                            {isRealTime && !isMobile && <td>
                                                {arrivalDelay}
                                            </td>}
                                            {!isMobile && <td>
                                                {scheduledDeparture}
                                            </td>}
                                            {isRealTime && !isMobile && <td>
                                                {realtimeDeparture}
                                            </td>}
                                            {isRealTime && !isMobile && <td>
                                                {departureDelay}
                                            </td>}
                                            {isMobile && <td>
                                                {realtime ? realtimeArrival : scheduledArrival}
                                            </td>}
                                        </tr>
                                    })}
                                </tbody>
                            </table>}
                    </div>
                )
            })}
        </div>
            : <div>Ei pysäkkejä</div>}
    </div>
}



export default TimeTable;