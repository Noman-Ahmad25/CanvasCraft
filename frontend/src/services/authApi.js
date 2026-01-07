// Use environment variables for different environments (Dev vs. Production)
const API_URL = import.meta.env?.VITE_API_URL || "http://localhost:5000/api/auth";

/**
 * Helper to handle fetch requests and errors
 */
const handleRequest = async (endpoint, data) => {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      // Throw an error with the message from the server if available
      throw new Error(result.message || "Something went wrong");
    }

    return result;
  } catch (error) {
    console.error("API Error:", error.message);
    throw error; // Re-throw so the UI can handle the error state
  }
};

export const login = (data) => handleRequest("/login", data);
export const register = (data) => handleRequest("/register", data);