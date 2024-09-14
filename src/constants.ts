const {
  VITE_API_PATH_GET_TOKEN,
  VITE_API_PATH_INFO,
  VITE_API_PATH_DOWNLOAD,
  VITE_API_PATH_CANCEL_DOWNLOAD,
} = import.meta.env

export const API_PORT = import.meta.env.VITE_API_PORT
export const ENV_DEVELOP = import.meta.env.DEV
export const API_URL = ENV_DEVELOP
  ? `http://localhost:${API_PORT}`
  : `${window.location.origin}`
export const API_TOKEN = `${API_URL}${VITE_API_PATH_GET_TOKEN}`
export const API_INFO = `${API_URL}${VITE_API_PATH_INFO}`
export const API_DOWNLOAD = `${API_URL}${VITE_API_PATH_DOWNLOAD}`
export const API_CANCEL_DOWNLOAD = `${API_URL}${VITE_API_PATH_CANCEL_DOWNLOAD}`
export const INDEX_NOT_FOUND = -1
export const THEME_LIGHT = 'light'
