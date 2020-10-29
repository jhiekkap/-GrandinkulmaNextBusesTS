import React, { useEffect } from 'react';
import { useStateValue, setStops } from "../state";
import { useQuery } from '@apollo/client'
import { STOP_QUERY, parseQuery } from '../graphQL' 
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Stop } from '../types';
import { useMediaQuery, Paper } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { Vehicle } from '../types'
import TimeTable from './TimeTable';

interface VehicleVars {
    name: string;
}

const SearchResult: React.FC = () => {

    const [{ stops, stopName }, dispatch] = useStateValue();
    const { loading, error, data } = useQuery<Vehicle, VehicleVars>(
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
        if (data) {
            console.log('DATAAA', data)
            dispatch(setStops(parseQuery(data)));
        }
    }, [data]);

    console.log(new Date(), 'FOUND STOPS', stops);

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        console.log('GQL ERROR', error);
        return <div> Error</div>
    }

    return (
        <Paper elevation={1}>
            {stops.length > 0 ? <div>
                {stops.map((stop: Stop, s) => {
                    const isRealTime: Boolean = Boolean(stop.vehicles.find(vehicle => vehicle.realtime));
                    const hasVehicles: Boolean = stops.length > 0 && stops[0].vehicles.length > 0;

                    return (
                        <div /* className='timetable' */ key={s}>
                            {stops.length === 2
                                && (s === 0 ? <ArrowForwardIcon /> : <ArrowBackIcon />)}
                            {hasVehicles ? <div>{`${stop.name} ${stop.code}`}</div> : <div>Ei tulevia lähtöjä</div>}
                            {hasVehicles && <TimeTable stop={stop} isMobile={isMobile} isRealTime={isRealTime} />}
                        </div>
                    )
                })}
            </div>
                : <div>Ei pysäkkejä</div>}
        </Paper>
    );
}


export default SearchResult;