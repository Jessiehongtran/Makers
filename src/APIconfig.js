export const API_URL = process.env.NODE_ENV === 'production'
    ? 'https://makers-app.herokuapp.com'
    : 'http://localhost:5000'