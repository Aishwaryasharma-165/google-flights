import { useState } from 'react';
import searchAirport from './SearchAirports';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import searchFlights from './SearchFlights';
import FlightTable from './FlightsTable';

const ShowFlights = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [originEntityId, setOriginEntityId] = useState('');
  const [destinationEntityId, setDestinationEntityId] = useState('');
  const [adults, setAdults] = useState(1);
  const [flights, setFlights] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  const handleIncrease = () => {
    setAdults((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setAdults((prev) => Math.max(1, prev - 1));
  };

  const style = {
    '& .MuiInputBase-root': {
      backgroundColor: 'black',
      color: 'white',
    },
    '& .MuiInputBase-input': {
      color: 'white',
    },
    '& .MuiFormLabel-root': {
      color: 'white',
    },
    '& .MuiFormLabel-root.Mui-focused': {
      color: 'white',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '& .MuiSvgIcon-root': {
      color: 'white',
    },
  };

  async function getFlights() {
    setLoading(true);
    try {
      const originData = await searchAirport(origin);
      const destinationData = await searchAirport(destination);

      setOriginEntityId(originData.entityId);
      setOrigin(originData.skyId);
      setDestinationEntityId(destinationData.entityId);
      setDestination(destinationData.skyId);

      const formattedDate = startDate.format('YYYY-MM-DD');
      const flightsData = await searchFlights(
        originData.skyId,
        destinationData.skyId,
        originData.entityId,
        destinationData.entityId,
        formattedDate,
        adults
      );

      setFlights(flightsData);

    } catch (error) {
      console.error('Error fetching flights:', error);
    } finally {
      setLoading(false);
      setFetched(true);
    }
  }

  return (
    <>
      <div style={{ padding: '1rem', textAlign: 'center' }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '2rem',
          border: '1.5rem solid #1a1b23f5',
          borderRadius: '8px',
          margin: '0 auto', 
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', margin: '0 1rem' }}>
            <div className="input-container" style={{ margin: '0.5rem' }}>
              <input
                style={{
                  padding: '1rem',
                  width: '150px',
                  minWidth: '120px',
                  color: 'white',
                  backgroundColor: 'black',
                  borderColor: 'white',
                  borderRadius: '5%',
                  fontWeight: '200'
                }}
                type="text"
                placeholder="Departure"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                maxLength={20}
                required
              />
            </div>
            <div className="input-container" style={{ margin: '0.5rem' }}>
              <input
                style={{
                  padding: '1rem',
                  width: '150px',
                  minWidth: '120px',
                  color: 'white',
                  backgroundColor: 'black',
                  borderColor: 'white',
                  borderRadius: '5%',
                  fontWeight: '200'
                }}
                type="text"
                placeholder="Destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                maxLength={20}
                required
              />
            </div>
            <div className="button-container" style={{ margin: '0.5rem', display: 'flex', alignItems: 'center' }}>
              <p style={{ margin: '0 0.5rem' }}>Adults</p>
              <button className="counter" onClick={handleDecrease}>-</button>
              <p style={{ margin: '0 0.5rem' }}>{adults}</p>
              <button className="counter" onClick={handleIncrease}>+</button>
            </div>
            <div className="input-container" style={{ margin: '0.5rem' }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    label="Departure"
                    value={startDate}
                    onChange={(newValue) => setStartDate(newValue)}
                    required
                    sx={style}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div className="input-container" style={{ margin: '0.5rem' }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    label="Return"
                    placeholder="Optional"
                    value={endDate}
                    onChange={(newValue) => setEndDate(newValue)}
                    sx={style}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <button
              style={{
                color: 'white',
                backgroundColor: 'black',
                height: '3rem',
                fontWeight: '200',
                padding: '0.5rem 1rem',
                margin: '2rem',
                borderColor: 'white',
                borderRadius: '5%'
              }}
              onClick={getFlights}>
              SEARCH
            </button>
          </div>
        </div>
      </div>
      {!fetched ? (
        <div style={{ height: '10rem' }}>
          {(!fetched && !loading) && <h1 className='loader' >Your destination is one click away!</h1>}
          {loading && <h1 className='loader'>Loading flights...</h1>}
        </div>) :
        (<div>{!loading && <FlightTable flights={flights} />}</div>)
      }
    </>
  );
};

export default ShowFlights;
