const API_KEY = 'fa555146006a08cf60f33c23067c8370'

export const createRequest = (path: string, params: { [key: string]: string } = {}) => {
  const urlObj = new URL(path)
  Object.keys(params).forEach(key => urlObj.searchParams.append(key, params[key]))
  urlObj.searchParams.append('api_key', API_KEY)

  return fetch(urlObj.toString())
}