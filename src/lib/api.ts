const API_KEY_MDB = 'fa555146006a08cf60f33c23067c8370';
const API_KEY_IMDB = 'af7b9611';

export const createRequest = (
  path: string,
  params: { [key: string]: string } = {},
  useOmdb = false
) => {
  const urlObj = new URL(path);
  Object.keys(params).forEach((key) =>
    urlObj.searchParams.append(key, params[key])
  );
  useOmdb
    ? urlObj.searchParams.append('apikey', API_KEY_IMDB)
    : urlObj.searchParams.append('api_key', API_KEY_MDB);

  return fetch(urlObj.toString());
};
