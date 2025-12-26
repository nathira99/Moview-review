export default function RatingStars({ rating = 0, onRate }) {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = Number(rating) >= star;

        return (
          <button
            key={star}
            type="button"
            onClick={() => onRate(star)}
            className={`text-3xl ${
              isActive ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}
