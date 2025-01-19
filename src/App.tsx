import React, { useState } from "react";
import { Link } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./services/queryClient";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BreedFilter from "./components/BreedFilter";
import CatGallery from "./components/CatGallery";
import { CatsProvider } from "./context/CatsContext";
import FavoriteCats from "./components/FavoriteCats";

const App: React.FC = () => {
  const [selectedBreed, setSelectedBreed] = useState("");

  return (
    <QueryClientProvider client={queryClient}>
      <CatsProvider>
        {" "}
        <Router>
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Cat Gallery</h1>
            <Link to="/favorites" className="text-blue-500 underline">View Favorite Cats</Link>
            <BreedFilter onBreedChange={setSelectedBreed} />
            <Routes>
              <Route
                path="/"
                element={<CatGallery breedId={selectedBreed} />}
              />
              <Route path="/favorites" element={<FavoriteCats />} />{" "}
            </Routes>
          </div>
        </Router>
      </CatsProvider>
    </QueryClientProvider>
  );
};

export default App;
