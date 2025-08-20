import { useAuth } from "@clerk/clerk-react";

export const useFetchWithAuth = () => {
  const { getToken } = useAuth();

  const fetchWithAuth = async (url, options = {}) => {
    // Get token from signed-in user session
    const token = await getToken();

    if (!token) {
      console.warn("No token available (user might not be signed in).");
    } else {
      console.log("Clerk Token (Bearer):", token); // prints token in console
    }

    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      ...(token ? { "Authorization": `Bearer ${token}` } : {}),
    };

    const res = await fetch(url, { ...options, headers });
    return res.json();
  };

  return fetchWithAuth;
};


