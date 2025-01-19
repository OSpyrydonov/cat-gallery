import React, { createContext, useState, ReactNode } from 'react';

interface Cat {
  id: string;
  url: string;
  breeds: { name: string }[];
}

interface CatsContextType {
  selectedCats: Cat[];
  addCat: (cat: Cat) => void;
  removeCat: (catId: string) => void;
}

const CatsContext = createContext<CatsContextType | undefined>(undefined);

interface CatsProviderProps {
  children: ReactNode;
}

const CatsProvider: React.FC<CatsProviderProps> = ({ children }) => {
  const [selectedCats, setSelectedCats] = useState<Cat[]>(() => {
    const storedCats = localStorage.getItem('selectedCats');
    return storedCats ? JSON.parse(storedCats) : [];
  });

  const addCat = (cat: Cat) => {
    const updatedCats = [...selectedCats, cat];
    setSelectedCats(updatedCats);
    localStorage.setItem('selectedCats', JSON.stringify(updatedCats));
  };

  const removeCat = (catId: string) => {
    const updatedCats = selectedCats.filter(cat => cat.id !== catId);
    setSelectedCats(updatedCats);
    localStorage.setItem('selectedCats', JSON.stringify(updatedCats));
  };

  return (
    <CatsContext.Provider value={{ selectedCats, addCat, removeCat }}>
      {children}
    </CatsContext.Provider>
  );
};

const useCats = () => {
  const context = React.useContext(CatsContext);
  if (!context) {
    throw new Error('useCats must be used within a CatsProvider');
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { CatsProvider, useCats };
