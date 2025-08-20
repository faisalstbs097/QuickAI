// src/api/api.js
export const API_URL = import.meta.env.VITE_API_URL;

// Example: fetch all creations
export const fetchCreations = async () => {
  try {
    const res = await fetch(`${API_URL}/creations`);
    return await res.json();
  } catch (err) {
    console.error(err);
  }
};
