import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const api = axios.create({
  baseURL: BASE_URL,
});

export const getPokemonList = async (limit = 20, offset = 0) => {
  try {
    const response = await api.get(`/pokemon?limit=${limit}&offset=${offset}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPokemonDetails = async (nameOrId) => {
  try {
    const response = await api.get(`/pokemon/${nameOrId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPokemonSpecies = async (nameOrId) => {
  try {
    const response = await api.get(`/pokemon-species/${nameOrId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTypes = async () => {
  try {
    const response = await api.get('/type');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPokemonByType = async (type) => {
  try {
    const response = await api.get(`/type/${type}`);
    return response.data.pokemon.map(p => p.pokemon);
  } catch (error) {
    throw error;
  }
};
