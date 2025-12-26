import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails } from "../services/omdbApi";
import RatingStars from "../components/RatingsStars";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState(() => {
    const saved = localStorage.getItem(`rating-${id}`);
    return saved ? Number(saved) : 0;
  });

  useEffect(() => {
    getMovieDetails(id).then(setMovie);
  }, [id]);

  const handleRate = (value) => {
    setRating(value);
    localStorage.setItem(`rating-${id}`, value);
  };

  if (!movie) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-6">

        {/* Back */}
        <Link
          to="/"
          className="text-sm text-blue-600 hover:underline"
        >
          ← Back to movies
        </Link>

        {/* MAIN CONTENT */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* POSTER */}
          <div>
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/300x450"
              }
              alt={movie.Title}
              className="w-full rounded-lg object-cover"
            />
          </div>

          {/* DETAILS */}
          <div className="md:col-span-2">
            <h1 className="text-2xl font-bold">
              {movie.Title}
            </h1>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
              <span>{movie.Year}</span>
              <span>{movie.Runtime}</span>
              <span>{movie.Genre}</span>
            </div>

            {/* RATING */}
            <div className="mt-4">
              <p className="font-semibold mb-1">Your Rating</p>
              <RatingStars rating={rating} onRate={handleRate} />
            </div>

            {/* PLOT */}
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Overview</h3>
              <p className="text-gray-700 leading-relaxed">
                {movie.Plot}
              </p>
            </div>

            {/* EXTRA INFO */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <p>
                <span className="font-medium">Director:</span>{" "}
                {movie.Director}
              </p>
              <p>
                <span className="font-medium">Actors:</span>{" "}
                {movie.Actors}
              </p>
              <p>
                <span className="font-medium">Language:</span>{" "}
                {movie.Language}
              </p>
              <p>
                <span className="font-medium">IMDb Rating:</span>{" "}
                {movie.imdbRating}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
