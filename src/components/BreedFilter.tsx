import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchBreeds } from "../services/catApi";

type Breed = {
  id: string;
  name: string;
};

interface Props {
  onBreedChange: (breedId: string) => void;
}

const BreedFilter: React.FC<Props> = ({ onBreedChange }) => {
  const { data: breeds, isLoading, error } = useQuery<Breed[], Error>({
    queryKey: ["breeds"],
    queryFn: fetchBreeds,
  });

  if (isLoading) return <p>Loading breeds...</p>;
  if (error) return <p>Error loading breeds</p>;

  return (
    <select onChange={(e) => onBreedChange(e.target.value)} className="border p-2 rounded">
      <option value="">Select a breed</option>
      {breeds?.map((breed: Breed) => (
        <option key={breed.id} value={breed.id}>
          {breed.name}
        </option>
      ))}
    </select>
  );
};

export default BreedFilter;