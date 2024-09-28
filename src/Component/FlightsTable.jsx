/* eslint-disable react/prop-types */
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from '@mui/material';

const FlightTable = ({ flights }) => {

  const flightsArray = flights.data.itineraries || [];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const flattenedFlights = flightsArray.flatMap(flight =>
    flight.legs.map((leg, index) => ({
      id: `${flight.id}-${index}`,
      origin: leg.origin.name,
      displayCode: leg.origin.displayCode,
      departure: new Date(leg.departure).toLocaleString(),
      destination: leg.destination.name,
      destinationCode: leg.destination.displayCode,
      arrival: new Date(leg.arrival).toLocaleString(),
      price: flight.price.formatted,
    }))
  );

  return (
    <div style={{ backgroundColor: 'rgb(26 27 35 / 96%)' }}>
      <TableContainer style={{ margin: '0 3rem', width: '90%', alignItems: 'center' }} component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: 'black' }}>Origin Airport</TableCell>
              <TableCell style={{ color: 'black' }}>Departure Time</TableCell>
              <TableCell style={{ color: 'black' }}>Destination Airport</TableCell>
              <TableCell style={{ color: 'black' }}>Arrival Time</TableCell>
              <TableCell style={{ color: 'black' }}>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {flattenedFlights.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No flights available
                </TableCell>
              </TableRow>
            ) : (
              flattenedFlights
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(flight => (
                  <TableRow key={flight.id} style={{ backgroundColor: 'black' }}>
                    <TableCell style={{ color: 'white' }}>{flight.origin} ({flight.displayCode})</TableCell>
                    <TableCell style={{ color: 'white' }}>{flight.departure}</TableCell>
                    <TableCell style={{ color: 'white' }}>{flight.destination} ({flight.destinationCode})</TableCell>
                    <TableCell style={{ color: 'white' }}>{flight.arrival}</TableCell>
                    <TableCell style={{ color: 'white' }}>{flight.price}</TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={flattenedFlights.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
};

export default FlightTable;