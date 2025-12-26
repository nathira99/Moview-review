import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.imdbID}`} className="block">
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden">

        <div className="relative aspect-[2/3] bg-gray-200">
          <img
            src={
              movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/300x450?text=No+Image"
            }
            alt={movie.Title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-4">
          <h2 className="font-semibold text-base line-clamp-2">
            {movie.Title}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {movie.Year}
          </p>
        </div>
      </div>
    </Link>
  );
}
