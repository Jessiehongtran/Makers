export const API_URL = process.env.NODE_ENV === 'production'
    ? 'https://makersapp-api.herokuapp.com'
    : 'http://localhost:5001'