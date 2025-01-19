import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCatsByBreed } from "../services/catApi";
import { useCats } from "../context/CatsContext";

interface Cat {
  id: string;
  url: string;
  breeds: { name: string }[];
}

const CatGallery: React.FC<{ breedId: string }> = ({ breedId }) => {
  const {
    data: cats,
    isLoading,
    error,
  } = useQuery<Cat[], Error>({
    queryKey: ["cats", breedId],
    queryFn: () => fetchCatsByBreed(breedId),
    enabled: !!breedId,
  });

  const { selectedCats, addCat, removeCat } = useCats();

  if (!breedId) return <p>Please select a breed.</p>;
  if (isLoading) return <p>Loading cats...</p>;
  if (error) return <p>Error loading cats.</p>;

  const handleFavorite = (cat: Cat) => {
    if (selectedCats.some((selectedCat) => selectedCat.id === cat.id)) {
      removeCat(cat.id);
    } else {
      addCat(cat);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-10">
      {cats?.map((cat: Cat) => {
        const isSelected = selectedCats.some(
          (selectedCat) => selectedCat.id === cat.id
        );

        return (
          <div
            key={cat.id}
            className={`border rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 ${
              isSelected ? "border-blue-500 bg-blue-100" : "bg-white"
            }`}
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
                onClick={() => handleFavorite(cat)}
                className={`w-full p-2 ${
                  isSelected
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white rounded mt-4`}
              >
                {isSelected ? "Remove from favorites" : "Add to favorites"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CatGallery;
