export const addFavorite = (id: string, title: string) => ({
  type: 'ADD_FAVORITE',
  id: id,
  title: title,
});

export const remFavorite = (id: string) => ({
  type: 'REM_FAVORITE',
  id: id,
});
