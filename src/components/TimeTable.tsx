import React, { useEffect, useState } from 'react';
import { useQuery  } from '@apollo/client'
import { STOP_QUERY, parseQuery } from '../graphQL'
import StopSearch from './StopSearch';
import { parseVehicle } from '../utils';
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
            pollInterval: 1000
        });
    const theme: Theme = useTheme();
    const isMobile: Boolean = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        if (initialStopQuery.data) {
            setStops(parseQuery(initialStopQuery.data));
        }
    }, [initialStopQuery]);

    console.log(new Date(), 'CHOSEN STOPS', stops);


    return <div className='timetableContainer'>
        <h4>{`Haun "${stopName}"  tulo${!isMobile ? '- ja lähtö' : ''}ajat`}</h4>
        <StopSearch setStopName={setStopName} />
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
                                        const { line, sortedRoute, realtime, scheduledArrival, realtimeArrival,
                                            arrivalDelay, scheduledDeparture, realtimeDeparture, departureDelay } = parseVehicle(vehicle)

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