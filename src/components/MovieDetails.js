import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../api/api";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieDetails(id)
      .then((data) => {
        console.log("Movie details:", data);
        setMovie(data);
      })
      .catch((err) => {
        console.error("Failed to fetch movie details:", err);
      });
  }, [id]);

  if (!movie) return <div>Loading...</div>;
  const imageUrl = movie.image || movie.poster || movie.image_url || "";

  return (
    <div className="movie-details-container">
      {imageUrl ? (
        <img src={imageUrl} alt={movie.title} />
      ) : (
        <div
          style={{
            width: 200,
            height: 300,
            backgroundColor: "#333",
            color: "#999",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          No Image
        </div>
      )}
      <h2>{movie.title}</h2>
      <p>
        <strong>Year:</strong> {movie.year}
      </p>
      <p>
        <strong>Rating:</strong> {movie.rating}
      </p>
      <p>
        <strong>Genre:</strong> {movie.genre}
      </p>
      <p>
        <strong>Director:</strong> {movie.director}
      </p>
    </div>
  );
};

export default MovieDetails;
