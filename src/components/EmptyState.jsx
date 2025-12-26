export default function EmptyState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-5xl mb-4">🎬</div>

      <h3 className="text-xl font-semibold mb-2">
        No movies found
      </h3>

      <p className="text-gray-500 max-w-md">
        {message || "Try searching with a different keyword."}
      </p>
    </div>
  );
}
