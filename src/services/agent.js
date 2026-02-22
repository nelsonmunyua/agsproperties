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

  // -------------------------
  // AGENT STATS
  // -------------------------
  getStats: async () => {
    const res = await fetch(`${apiUrl}/agent/stats`, {
      headers: api.authHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch agent stats');
    return res.json();
  },

  // -------------------------
  // AGENT PROPERTIES
  // -------------------------
  getProperties: async (limit = 10) => {
    const res = await fetch(`${apiUrl}/agent/properties?limit=${limit}`, {
      headers: api.authHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch properties');
    return res.json();
  },

  getProperty: async (propertyId) => {
    const res = await fetch(`${apiUrl}/agent/properties/${propertyId}`, {
      headers: api.authHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch property');
    return res.json();
  },

  createProperty: async (propertyData) => {
    // DEBUG: Log what we're sending
    console.log("=== FRONTEND DEBUG: Creating property ===");
    for (let [key, value] of propertyData.entries()) {
      if (value instanceof File) {
        console.log(`${key}: [File] ${value.name} (${value.size} bytes)`);
      } else {
        console.log(`${key}: ${value}`);
      }
    }

    // Use the FormData directly that was passed from the form
    // Don't recreate FormData - just use what was passed
    const formData = propertyData;

    const res = await fetch(`${apiUrl}/agent/properties/create`, {
      method: 'POST',
      headers: {
        ...api.authHeaders(),
        // Don't set Content-Type for FormData - browser will set it with boundary
      },
      body: formData,
    });
    
    if (!res.ok) {
      const error = await res.json();
      console.log("=== SERVER ERROR RESPONSE ===", error);
      throw new Error(error.message || 'Failed to create property');
    }
    return res.json();
  },

  updateProperty: async (propertyId, propertyData) => {
    // Use the FormData directly that was passed from the form
    const formData = propertyData;

    const res = await fetch(`${apiUrl}/agent/properties/${propertyId}`, {
      method: 'PUT',
      headers: {
        ...api.authHeaders(),
        // Don't set Content-Type for FormData - browser will set it with boundary
      },
      body: formData,
    });
    
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Failed to update property');
    }
    return res.json();
  },

  deleteProperty: async (propertyId) => {
    const res = await fetch(`${apiUrl}/agent/properties/${propertyId}/delete`, {
      method: 'DELETE',
      headers: api.authHeaders(),
    });
    if (!res.ok) throw new Error('Failed to delete property');
    return res.json();
  },

  // -------------------------
  // AGENT INQUIRIES
  // -------------------------
  getInquiries: async (limit = 10) => {
    const res = await fetch(`${apiUrl}/agent/inquiries?limit=${limit}`, {
      headers: api.authHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch inquiries');
    return res.json();
  },

  replyToInquiry: async (inquiryId, reply) => {
    const res = await fetch(`${apiUrl}/agent/inquiries/${inquiryId}/reply`, {
      method: 'POST',
      headers: {
        ...api.authHeaders(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reply }),
    });
    if (!res.ok) throw new Error('Failed to reply to inquiry');
    return res.json();
  },
};

export default api;

