const apiUrl = import.meta.env.VITE_API_URL;

const api = {

 // -------------------------
  // AUTH HEADER HELPER
  // -------------------------
    authHeaders: () => {
        const token = localStorage.getItem("access_token");
        return {
            Authorization: `Bearer ${token}`,
        };
    },

    

}

export default api;