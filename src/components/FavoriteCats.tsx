import React from "react";
import { Link } from "react-router-dom";
import { useCats } from "../context/CatsContext";

const FavoriteCats: React.FC = () => {
  const { selectedCats, removeCat } = useCats();

  if (selectedCats.length === 0) {
    return <p className="text-center text-xl">No favorite cats yet.</p>;
  }

  return (
    <>
      <Link to="/" className="text-blue-500 underline">
        View Cats Back
      </Link>
      <div className="grid grid-cols-3 gap-10">
        {selectedCats.map((cat) => (
          <div
            key={cat.id}
            className="border rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105"
          >
            <img
              src={cat.url}
              alt={cat.breeds[0]?.name || "Cat"}
              className="w-[250px] h-[250px] object-cover mx-auto border rounded-lg"
            />
            <div className="p-4">
              <p className="text-center font-semibold text-lg">
                {cat.breeds[0]?.name || "Unknown breed"}
              </p>
              <button
                onClick={() => removeCat(cat.id)}
                className="w-full p-2 bg-red-500 text-white rounded mt-4 hover:bg-red-600"
              >
                Remove from favorites
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FavoriteCats;
