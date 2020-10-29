import React from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { Stop } from '../types'
import { parseVehicle } from '../utils';

const Td = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
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


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

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
            <Td>Linja</Td>
            <Td>Reitti</Td>
            {!isMobile && <Td>Reaaliaikainen saapumistieto</Td>}
            {!isMobile && <Td>Aikataulun mukainen tuloaika </Td>}
            {isRealTime && !isMobile && <Td>Arvioitu tuloaika</Td>}
            {isRealTime && !isMobile && <Td>Tuloaika myöhässä</Td>}
            {!isMobile && <Td>Aikataulun mukainen lähtöaika</Td>}
            {isRealTime && !isMobile && <Td>Arvioitu lähtöaika</Td>}
            {isRealTime && !isMobile && <Td>Lähtöaika myöhässä</Td>}
            {isMobile && <Td>Tuloaika</Td>}
          </TableRow>
        </TableHead>
        <TableBody>
          {stop.vehicles.map((vehicle, i) => {
            const { line, sortedRoute, realtime, scheduledArrival, realtimeArrival,
              arrivalDelay, scheduledDeparture, realtimeDeparture, departureDelay } = parseVehicle(vehicle)

            return (
              <Tr key={i}>
                <Td>{line}</Td>
                <Td>{sortedRoute}</Td>
                {!isMobile && <Td>{realtime ? 'KYLLÄ' : 'EI'}</Td>}
                {!isMobile && <Td>{scheduledArrival}</Td>}
                {isRealTime && !isMobile && <Td>{realtimeArrival}</Td>}
                {isRealTime && !isMobile && <Td>{arrivalDelay}</Td>}
                {!isMobile && <Td>{scheduledDeparture}</Td>}
                {isRealTime && !isMobile && <Td>{realtimeDeparture}</Td>}
                {isRealTime && !isMobile && <Td>{departureDelay}</Td>}
                {isMobile && <Td>{realtime ? realtimeArrival : scheduledArrival}</Td>}
              </Tr>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TimeTable;
