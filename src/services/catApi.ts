import axios from "axios";

const API_KEY = "live_Z4HFjwvrV6rYv6xnKSw0IX5QiufetJ62HdKZRilKehiSXO8aj2BDGWiNs2LEsFS8";
const BASE_URL = "https://api.thecatapi.com/v1";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "x-api-key": API_KEY,
  },
});

export const fetchBreeds = async () => {
  const { data } = await api.get("/breeds");
  return data;
};

export const fetchCatsByBreed = async (breedId: string, limit: number = 10) => {
  const { data } = await api.get(`/images/search`, {
    params: { breed_ids: breedId, limit },
  });
  return data;
};

