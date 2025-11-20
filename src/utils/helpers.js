export const getPokemonIdFromUrl = (url) => {
  const parts = url.split('/').filter(Boolean);
  return parts[parts.length - 1];
};

export const formatPokemonId = (id) => {
  return `#${String(id).padStart(3, '0')}`;
};

export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};
