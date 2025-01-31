import React, { useEffect, useState } from "react";
import Search from "./components/Search.jsx";
import MovieCard from "./components/MovieCard.jsx";
import Loader from "./components/Loader.jsx";
import { motion } from "framer-motion";

import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "./appwrite.js";
import GenreButtons from "./components/GenreButtons.jsx";
import Spline from "@splinetool/react-spline";

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  // Searching States
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Movie List States
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Trending Movies States
  const [trendingMovies, setTrendingMovies] = useState([]);

  // Debounce the search term to prevent API calls on every keystroke
  // By waiting for 500ms after the user stops typing
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  // Method for Fetching Movie data
  const fetchMovies = async (query = "", genreId = null) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : genreId
          ? `${API_BASE_URL}/discover/movie?with_genres=${genreId}&sort_by=popularity.desc`
          : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();

      // Display the data in the console
      console.log(data);

      if (data.Response === "False") {
        setErrorMessage(data.Error || "Failed to fetch movies");
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error(`Error Fetching Movies: ${error}`);
      setErrorMessage("Error Fetching Movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch Trending Movies
  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.error(`Error Fetching Trending Movies: ${error}`);
    }
  };

  // Call the method fetch movies when the debounced search term changes
  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  // Call the method loadTrendingMovies on initial render
  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <div className="pattern">
        <div className="wrapper">
          {/*Header*/}
          <header>
            {/*Logo with site name*/}
            <div className="flex justify-center items-center space-x-2 mb-16">
              {/* Logo */}
              <img src="/Cineverse.svg" alt="Cineverse Logo" className="logo" />
              {/* Brand */}
              <span className="brand">
                <span>ᑢ</span>ineverse
              </span>
            </div>

            <h1>
              Find <span className="text-gradient">Movies</span> You'll Enjoy
              Without the Hassle
            </h1>
            {/*Spline 3D model*/}
            <Spline
              scene="https://prod.spline.design/WFisHFz8bcuDMLgq/scene.splinecode"
              className="w-full sm:w-1/2 h-[400px] sm:h-[680px]"
            />
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>

          {/*Quick search by Genre*/}
          <GenreButtons onGenreClick={fetchMovies} />

          {/*Trending Movies*/}
          {trendingMovies.length > 0 && (
            <section className="trending">
              <h2>Trending Movies</h2>

              {/*Trending movies are based on the number of searches made by users */}
              <ul>
                {trendingMovies.map((movie, index) => (
                  <li key={movie.$id}>
                    <p>{index + 1}</p>
                    <img src={movie.poster_url} alt={movie.title} />
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/*All Movies*/}
          <motion.section
            className="all-movies"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h2>All Movies</h2>

            {/*Display a loader when the data is being fetched*/}
            {isLoading ? (
              <Loader />
            ) : errorMessage ? (
              <p className="text-red-500">{errorMessage}</p>
            ) : movieList.length === 0 ? (
              <p className="text-gray-500 text-lg mt-4 font-sans">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  🥲 No results found. Try searching for another genre or
                  keyword.
                </motion.div>
              </p>
            ) : (
              <ul>
                {movieList.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </ul>
            )}
          </motion.section>
        </div>
      </div>
    </main>
  );
};
export default App;
