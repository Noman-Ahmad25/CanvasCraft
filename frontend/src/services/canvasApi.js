const API_URL = import.meta.env?.VITE_API_URL || 'http://localhost:5000/api';


// Helper to get headers with the token
const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${localStorage.getItem("token")}`
});

export const getCanvases = async (page = 1, limit = 5) => {
  const res = await fetch(`${API_URL}/canvases?page=${page}&limit=${limit}`, {
    headers: getAuthHeaders() // Added authentication
  });
  if (!res.ok) throw new Error("Failed to fetch Canvases");
  return res.json();
};

export const createCanvas = async (data) => {
  const res = await fetch(`${API_URL}/canvases`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Failed to create canvas");
  return res.json();
};

export const updateCanvas = async (id, data) => {
  const res = await fetch(`${API_URL}/canvases/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Failed to update canvas");
  return res.json();
};

export const deleteCanvas = async (id) => {
  const res = await fetch(`${API_URL}/canvases/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders() // Added authentication
  });
  if (!res.ok) throw new Error("Failed to delete canvas");
  return true; // Return true to indicate success
};
