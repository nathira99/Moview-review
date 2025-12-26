import { useEffect, useState } from "react";
import { searchMovies } from "../services/omdbApi";
import MovieCard from "../components/MovieCard";
import SkeletonCard from "../components/SkeletonCard";
import EmptyState from "../components/EmptyState";

export default function Home() {
  const [query, setQuery] = useState("");
  const [popularMovies, setPopularMovies] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadHomeMovies();
  }, []);

  // 🔹 Load Popular + Latest separately
  const loadHomeMovies = async () => {
    setLoading(true);

    try {
      // Popular movies (general keyword)
      const popularRes = await searchMovies("art");
      // Latest movies (recent year keyword)
      const latestRes = await searchMovies("2024");

      if (popularRes.Response === "True") {
        setPopularMovies(popularRes.Search.slice(0, 8));
      }

      if (latestRes.Response === "True") {
        // remove duplicates using imdbID
        const popularIds = new Set(
          popularRes.Search.map((m) => m.imdbID)
        );

        const filteredLatest = latestRes.Search.filter(
          (m) => !popularIds.has(m.imdbID)
        );

        setLatestMovies(filteredLatest.slice(0, 8));
      }

      setError("");
    } catch (err) {
      setError("Something went wrong while fetching movies");
    }

    setLoading(false);
  };

  // 🔹 Search replaces ONLY popular movies
  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    const data = await searchMovies(query);

    if (data.Response === "True") {
      setPopularMovies(data.Search.slice(0, 8));
      setError("");
    } else {
      setPopularMovies([]);
      setError(data.Error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <div className="bg-white shadow-sm">
        <div className="max-w-screen mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-center">
            Movie Review App
          </h1>
          <p className="text-center text-gray-500 mt-2">
            Search and explore movies
          </p>

          <div className="mt-6 flex gap-2 max-w-xl mx-auto">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies..."
              className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              onClick={handleSearch}
              className="bg-black text-white px-6 rounded-lg hover:bg-gray-800 transition"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-screen mx-auto px-6 py-10">
        {loading && (
  <>
    <h2 className="text-xl font-semibold mb-6">
      Loading Movies
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
      {Array.from({ length: 8 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  </>
)}

        {!loading && error && (
  <EmptyState message={error} />
)}


        {/* POPULAR MOVIES */}
        {popularMovies.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mb-6">
              Popular Movies
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
              {popularMovies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>
          </>
        )}

        {/* LATEST MOVIES */}
        {latestMovies.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mb-6">
              Latest Movies
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {latestMovies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
