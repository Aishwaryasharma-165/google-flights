import axios from 'axios'
async function searchAirport(location) {
  const options = {
    method: 'GET',
    url: import.meta.env.VITE_SEARCH_AIRPORTS,
    params: {
      query: location,
      locale: 'en-US'
    },
    headers: {
      'x-rapidapi-key': import.meta.env.VITE_RAPID_API_KEY,
      'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return { entityId: response.data.data[0]?.entityId, skyId: response.data.data[0]?.skyId };
  } catch (error) {
    console.error(error);
  }
}
export default searchAirport;