const apiUrl = import.meta.env.VITE_API_URL;

const api = {

 // -------------------------
  // SIGN UP
  // -------------------------
  register: async (userData) => {
    const response = await fetch(`${apiUrl}/signup`, {
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

    // Save token if present (for automatic login after signup)
    if (data.access_token) {
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    return data;
  },

  // -------------------------
  // LOGIN
  // -------------------------
  login: async (email, password) => {
    const response = await fetch(`${apiUrl}/login`, {
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

    // Save token if present
    if (data.access_token) {
      localStorage.setItem("access_token", data.access_token);
    }

    return data;
  },


  // -------------------------
  // LOGOUT
  // -------------------------
  logout: async () => {
    const response = await fetch(`${apiUrl}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...api.authHeaders(),
      },
    });

    // Clear token regardless of server response
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");

    const data = await response.json();
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
