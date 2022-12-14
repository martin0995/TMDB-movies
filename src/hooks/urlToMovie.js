export const urlToMovie = (str) => {
  const movieName = str.replace(/_/g, " ");
  return movieName;
};
