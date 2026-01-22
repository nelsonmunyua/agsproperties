const API_BASE_URL = "http://localhost:5000";

const api = {
  // -------------------------
  // SIGN UP
  // -------------------------
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Signup failed");
    }

    return data;
  },

  // -------------------------
  // LOGIN
  // -------------------------
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    // Save token
    if (data.access_token) {
      localStorage.setItem("access_token", data.access_token);
    }

    return data;
  },

  // -------------------------
  // AUTH HEADER HELPER
  // -------------------------
  authHeaders: () => {
    const token = localStorage.getItem("access_token");
    return {
      Authorization: `Bearer ${token}`,
    };
  },
};

export default api;
