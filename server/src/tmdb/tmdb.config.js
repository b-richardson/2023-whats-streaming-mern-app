const baseUrl = process.env.TMDB_BASE_URL;
const key = process.env.TMDB_KEY;

// ALL STREAMING ENDPOINT ADDRESS
const getUrl = (endpoint, params) => {
  const qs = new URLSearchParams(params);
  console.log( `${baseUrl}${endpoint}?api_key=${key}&language=en-US&${qs}&region=US`)

  // return `${baseUrl}${endpoint}?api_key=${key}&${qs}`;
  return  `${baseUrl}${endpoint}?api_key=${key}&language=en-US&${qs}&watch_region=US&with_watch_monetization_types=flatrate|free|ads`
  
};

// export default { getUrl };


// BELOW ARE THE INDIVIDUAL PLATFORMS

// NETFLIX
// "provider_name": "Netflix",
// "provider_id": 8
const getNetflixUrl = (endpoint, params) => {
  const qs = new URLSearchParams(params);
  console.log( `${baseUrl}${endpoint}?api_key=${key}&language=en-US&${qs}&region=US`, 'Netflix')

  // return `${baseUrl}${endpoint}?api_key=${key}&${qs}`;
  return  `${baseUrl}${endpoint}?api_key=${key}&language=en-US&${qs}&with_watch_providers=8&watch_region=US&with_watch_monetization_types=flatrate|free|ads`
  
};

// AMAZON PRIME VIDEO
// "provider_name": "Amazon Prime Video",
// "provider_id": 9
const getPrimeUrl = (endpoint, params) => {
  const qs = new URLSearchParams(params);
  console.log( `${baseUrl}${endpoint}?api_key=${key}&language=en-US&${qs}&region=US`)

  // return `${baseUrl}${endpoint}?api_key=${key}&${qs}`;
  return  `${baseUrl}${endpoint}?api_key=${key}&language=en-US&${qs}&with_watch_providers=9&watch_region=US&with_watch_monetization_types=flatrate|free|ads`
  
};

// DISNEY PLUS
// "provider_name": "Disney Plus",
// "provider_id": 337
const getDisneyUrl = (endpoint, params) => {
  const qs = new URLSearchParams(params);
  console.log( `${baseUrl}${endpoint}?api_key=${key}&language=en-US&${qs}&region=US`)

  // return `${baseUrl}${endpoint}?api_key=${key}&${qs}`;
  return  `${baseUrl}${endpoint}?api_key=${key}&language=en-US&${qs}&with_watch_providers=337&watch_region=US&with_watch_monetization_types=flatrate|free|ads`
  
};

// APPLE TV
// "provider_name": "Apple TV",
// "provider_id": 2
const getAppleUrl = (endpoint, params) => {
  const qs = new URLSearchParams(params);
  console.log( `${baseUrl}${endpoint}?api_key=${key}&language=en-US&${qs}&region=US`)

  // return `${baseUrl}${endpoint}?api_key=${key}&${qs}`;
  return  `${baseUrl}${endpoint}?api_key=${key}&language=en-US&${qs}&with_watch_providers=2&watch_region=US&with_watch_monetization_types=flatrate|free|ads`
  
};

// HULU
// "provider_name": "Hulu",
// "provider_id": 15
const getHuluUrl = (endpoint, params) => {
  const qs = new URLSearchParams(params);
  console.log( `${baseUrl}${endpoint}?api_key=${key}&language=en-US&${qs}&region=US`)

  // return `${baseUrl}${endpoint}?api_key=${key}&${qs}`;
  return  `${baseUrl}${endpoint}?api_key=${key}&language=en-US&${qs}&with_watch_providers=15&watch_region=US&with_watch_monetization_types=flatrate|free|ads`
  
};

// HBO MAX
// "provider_name": "HBO",
// "provider_id": 118
const getHBOUrl = (endpoint, params) => {
  const qs = new URLSearchParams(params);
  console.log( `${baseUrl}${endpoint}?api_key=${key}&language=en-US&${qs}&region=US`)

  // return `${baseUrl}${endpoint}?api_key=${key}&${qs}`;
  return  `${baseUrl}${endpoint}?api_key=${key}&language=en-US&${qs}&with_watch_providers=118&watch_region=US&with_watch_monetization_types=flatrate|free|ads`
  
};

// CRUNCHYROLL
// "provider_name": "Crunchyroll",
// "provider_id": 283
const getCrunchyUrl = (endpoint, params) => {
  const qs = new URLSearchParams(params);
  console.log( `${baseUrl}${endpoint}?api_key=${key}&language=en-US&${qs}&region=US`)

  // return `${baseUrl}${endpoint}?api_key=${key}&${qs}`;
  return  `${baseUrl}${endpoint}?api_key=${key}&language=en-US&${qs}&with_watch_providers=283&watch_region=US&with_watch_monetization_types=flatrate|free|ads`
  
};



export default { getUrl, getNetflixUrl, getAppleUrl, getDisneyUrl, getPrimeUrl, getHuluUrl, getHBOUrl, getCrunchyUrl };