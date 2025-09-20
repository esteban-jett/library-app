import axios from 'axios';

const BASE_URL = 'https://openlibrary.org';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
});

export const getTrendingBooks = async () => {
  try {
    const response = await api.get('/trending/daily.json');
    return response.data;
  } catch (error) {
    console.error('Error fetching trending books:', error);
    throw error;
  }
};

export const searchBooks = async (query, limit = 24) => {
  try {
    const response = await api.get('/search.json', {
      params: {
        q: query,
        limit: limit
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching books:', error);
    throw error;
  }
};

export const searchBooksBySubject = async (subject, limit = 12) => {
  try {
    const response = await api.get('/search.json', {
      params: {
        subject: subject,
        limit: limit
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching books by subject:', error);
    throw error;
  }
};

export const getBookDetails = async (bookKey) => {
  try {
    const response = await api.get(`${bookKey}.json`);
    return response.data;
  } catch (error) {
    console.error('Error fetching book details:', error);
    throw error;
  }
};

export const getBookCoverUrl = (coverId, size = 'L') => {
  if (!coverId) return null;
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
};

export const getCoverByISBN = (isbn, size = 'L') => {
  if (!isbn) return null;
  return `https://covers.openlibrary.org/b/isbn/${isbn}-${size}.jpg`;
};

export const getCoverByOLID = (olid, size = 'L') => {
  if (!olid) return null;
  return `https://covers.openlibrary.org/b/olid/${olid}-${size}.jpg`;
};