import React from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { Stop } from '../types'
import { parseVehicle } from '../utils';

const Td = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.white,//'#115293',// theme.palette.common.black,
      color: theme.palette.common.black,//theme.palette.common.white,
    },
    body: {
      fontSize:16,
    },
  }),
)(TableCell);

const Tr = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);


const useStyles = makeStyles((theme) => ({
  table: {
   // minWidth: 700,
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
  },
}));

interface TableProps {
  stop: Stop;
  isMobile: Boolean;
  isRealTime: Boolean;
};

const TimeTable: React.FC<TableProps> = ({ stop, isMobile, isRealTime }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <Td align="center">Linja</Td>
            <Td align="center">Reitti</Td>
            {!isMobile && <Td align="center">Reaaliaikainen saapumistieto</Td>}
            {!isMobile && <Td align="center">Aikataulun mukainen tuloaika </Td>}
            {isRealTime && !isMobile && <Td align="center">Arvioitu tuloaika</Td>}
            {isRealTime && !isMobile && <Td align="center">Tuloaika myöhässä</Td>}
            {!isMobile && <Td align="center">Aikataulun mukainen lähtöaika</Td>}
            {isRealTime && !isMobile && <Td align="center">Arvioitu lähtöaika</Td>}
            {isRealTime && !isMobile && <Td align="center">Lähtöaika myöhässä</Td>}
            {isMobile && <Td align="center">Tuloaika</Td>}
          </TableRow>
        </TableHead>
        <TableBody>
          {stop.vehicles.map((vehicle, i) => {
            const { line, sortedRoute, realtime, scheduledArrival, realtimeArrival,
              arrivalDelay, scheduledDeparture, realtimeDeparture, departureDelay } = parseVehicle(vehicle)

            return (
              <Tr key={i}>
                <Td align="center">{line}</Td>
                <Td align="center">{sortedRoute}</Td>
                {!isMobile && <Td align="center">{realtime ? 'KYLLÄ' : 'EI'}</Td>}
                {!isMobile && <Td align="center">{scheduledArrival}</Td>}
                {isRealTime && !isMobile && <Td align="center">{realtimeArrival}</Td>}
                {isRealTime && !isMobile && <Td align="center">{arrivalDelay}</Td>}
                {!isMobile && <Td align="center">{scheduledDeparture}</Td>}
                {isRealTime && !isMobile && <Td align="center">{realtimeDeparture}</Td>}
                {isRealTime && !isMobile && <Td align="center">{departureDelay}</Td>}
                {isMobile && <Td align="center">{realtime ? realtimeArrival : scheduledArrival}</Td>}
              </Tr>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TimeTable;
