export const API_URL = process.env.NODE_ENV === 'production'
    ? 'https://makers-app.herokuapp.com/api/category'
    : 'http://localhost:5000'