const API_ROOT = 'https://api.unsplash.com';
const accessKey = process.env.UNSPLASH_ACCESS_KEY;
import axios from 'axios';

export const imageUnsplash = async (query, count = 15) =>
  await axios.get(
    `${API_ROOT}/photos/random?client_id=${accessKey}&count=${count}&query=${query}`
  );
