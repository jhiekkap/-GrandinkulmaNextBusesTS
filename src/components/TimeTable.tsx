import React from 'react';
import { getTime, delayToString } from '../utils';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Stop } from '../types';
import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

interface TimeTableProps {
    chosenStops: Stop[];
    chosenStopName: string;
}

const TimeTable: React.FC<TimeTableProps> = ({ chosenStops, chosenStopName, children }) => {
    const theme: Theme = useTheme();
    const isMobile: Boolean = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div className='timetableContainer'>
            <h4>{`Pysäkkihaun "${chosenStopName}"  tulo${!isMobile ? '- ja lähtö' : ''}ajat`}</h4>
            {children}
            {chosenStops.map((stop, s) => {
                const isRealTime = Boolean(stop.vehicles.find(vehicle => vehicle.realtime));
                return <div className='timetable' key={s}>
                    {chosenStops.length === 2 && (s === 0 ? <ArrowForwardIcon /> : <ArrowBackIcon />)}
                    <div>{`${stop.name} ${stop.code}`}</div>
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
                                const { serviceDay } = vehicle
                                const serviceDayInMs = serviceDay * 1000
                                const scheduledArrival = getTime(new Date(serviceDayInMs + vehicle.scheduledArrival * 1000).toString())
                                //console.log('SCHEDULED ARRIVAL', scheduledArrival)
                                const realtimeArrival = getTime(new Date(serviceDayInMs + vehicle.realtimeArrival * 1000).toString())
                                //console.log('REAL TIME ARRIVAL', realtimeArrival)
                                const arrivalDelay = delayToString(vehicle.arrivalDelay)
                                //console.log('ARRIVAL DELAY ', arrivalDelay)
                                const scheduledDeparture = getTime(new Date(serviceDayInMs + vehicle.scheduledDeparture * 1000).toString())
                                //console.log('SCHEDULED DEPARTURE', scheduledDeparture)
                                const realtimeDeparture = getTime(new Date(serviceDayInMs + vehicle.realtimeDeparture * 1000).toString())
                                //console.log('REAL TIME DEPARTURE', realtimeDeparture)
                                const departureDelay = delayToString(vehicle.departureDelay)
                                //console.log('DEPARTURE DELAY ', departureDelay)

                                return <tr key={i}>
                                    <td>
                                        {vehicle.line}
                                    </td>
                                    <td>
                                        {vehicle.route}
                                    </td>
                                    {!isMobile && <td>
                                        {vehicle.realtime ? 'KYLLÄ' : 'EI'}
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
                                        {vehicle.realtime ? realtimeArrival : scheduledArrival}
                                    </td>}
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            })}
        </div>
    )
}



export default TimeTable;