import React, { useEffect, useState } from 'react';
import { fetchTopMovies, fetchMovieDetails } from '../api/api';
import { Link } from 'react-router-dom';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTopMovies()
      .then(setMovies)
      .catch(err => setError(err.message));
  }, []);

  if(error) return <p>Error: {error}</p>;
  if(movies.length === 0) return <p>Loading movies...</p>;

  return (
    <div>
      <h2>Top 100 Movies</h2>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              {movie.title} ({movie.release_date?.slice(0,4)})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;

