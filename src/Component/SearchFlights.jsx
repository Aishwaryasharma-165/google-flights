import axios from 'axios'
async function searchFlights(origin, destination, originEntityId, destinationEntityId, startDate, adults) {
  const options = {
    method: 'GET',
    url: import.meta.env.VITE_SEARCH_FLIGHTS,
    params: {
      originSkyId: origin,
      destinationSkyId: destination,
      originEntityId: originEntityId,
      destinationEntityId: destinationEntityId,
      date: startDate,
      cabinClass: 'economy',
      adults: adults,
      sortBy: 'best',
      currency: 'USD',
      market: 'en-US',
      countryCode: 'US'
    },
    headers: {
      'x-rapidapi-key': import.meta.env.VITE_RAPID_API_KEY,
      'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export default searchFlights;