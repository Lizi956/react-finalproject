const API_URL = "https://imdb-top-100-movies.p.rapidapi.com/";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
    "X-RapidAPI-Host": process.env.REACT_APP_RAPIDAPI_HOST,
  },
};

export const fetchTopMovies = async () => {
  const response = await fetch(API_URL, options);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to fetch movies: ${response.status} - ${errorText}`
    );
  }
  return response.json();
};

export const fetchMovieDetails = async (id) => {
  const response = await fetch(`${API_URL}${id}`, options);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to fetch movie details: ${response.status} - ${errorText}`
    );
  }
  return response.json();
};
