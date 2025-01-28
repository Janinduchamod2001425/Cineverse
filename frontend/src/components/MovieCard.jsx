import React from "react";

// Create a map by adding movie genres to the genre id
const genresMap = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

const MovieCard = ({
  movie: {
    title,
    vote_average,
    poster_path,
    release_date,
    original_language,
    genre_ids,
  },
}) => {
  // Map genre ids to genre names
  const genreNames = genre_ids?.map((id) => genresMap[id]).filter(Boolean);

  return (
    <div className="movie-card-container">
      <div className="movie-card">
        {/*Movie Poster*/}
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : "no-movie.png"
          }
          alt={title}
        />
        {/*Movie Title*/}
        <div className="mt-4">
          <h3>{title}</h3>

          <div className="content">
            <div className="rating">
              <img src="star.svg" alt="Star" />
              <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
            </div>

            <span>•</span>
            <p className="lang">{original_language}</p>

            <span>•</span>
            <p className="year">
              {release_date ? release_date.split("-")[0] : "N/A"}
            </p>
          </div>

          {/*Genres*/}
          {/*<div className="genres flex flex-wrap gap-2 mt-4">*/}
          {/*  {genreNames && genreNames.length > 0 ? (*/}
          {/*    genreNames.map((genre, index) => (*/}
          {/*      <span key={index} className="genre">*/}
          {/*        {genre}*/}
          {/*        {index < genreNames.length - 1 && " "}*/}
          {/*      </span>*/}
          {/*    ))*/}
          {/*  ) : (*/}
          {/*    <span className="genre">N/A</span>*/}
          {/*  )}*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
};
export default MovieCard;
