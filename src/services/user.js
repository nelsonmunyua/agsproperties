// import { BASE_URL } from "../../utils";
const apiUrl = import.meta.env.VITE_API_URL;


const api = {
  // -------------------------
  // USER PROFILE
  // -------------------------
  getUserProfile: async () => {
    const response = await fetch(`${apiUrl}/user/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...api.authHeaders(),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch profile");
    }

    return data;
  },

  updateUserProfile: async (profileData) => {
    const response = await fetch(`${apiUrl}/user/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...api.authHeaders(),
      },
      body: JSON.stringify(profileData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update profile");
    }

    return data;
  },

  getUserStats: async () => {
    const response = await fetch(`${apiUrl}/user/stats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...api.authHeaders(),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch stats");
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

  // -------------------------
  // CREATE INQUIRY
  // -------------------------
  createInquiry: async (propertyId, message) => {
    const response = await fetch(`${apiUrl}/user/inquiry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...api.authHeaders(),
      },
      body: JSON.stringify({ property_id: propertyId, message }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to send inquiry");
    }

    return data;
  },

  // -------------------------
  // GET USER INQUIRIES
  // -------------------------
  getUserInquiries: async (limit = 0) => {
    const url = limit > 0 
      ? `${apiUrl}/user/inquiries?limit=${limit}` 
      : `${apiUrl}/user/inquiries`;
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...api.authHeaders(),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch inquiries");
    }

    return data;
  },

  // -------------------------
  // MESSAGING API
  // -------------------------
  
  // Get all conversations
  getConversations: async () => {
    const response = await fetch(`${apiUrl}/user/conversations`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...api.authHeaders(),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch conversations");
    }

    return data;
  },

  // Get messages in a conversation
  getConversationMessages: async (conversationId) => {
    const response = await fetch(`${apiUrl}/user/conversations/${conversationId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...api.authHeaders(),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch messages");
    }

    return data;
  },

  // Send a message in a conversation
  sendMessage: async (conversationId, content) => {
    const response = await fetch(`${apiUrl}/user/conversations/${conversationId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...api.authHeaders(),
      },
      body: JSON.stringify({ content }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to send message");
    }

    return data;
  },

  // Start a new conversation
  startConversation: async (agentId, propertyId, message) => {
    const response = await fetch(`${apiUrl}/user/conversation/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...api.authHeaders(),
      },
      body: JSON.stringify({ 
        agent_id: agentId, 
        property_id: propertyId, 
        message 
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to start conversation");
    }

    return data;
  },

  // Schedule a property visit
  scheduleVisit: async (propertyId, date, time, message) => {
    const response = await fetch(`${apiUrl}/user/schedule-visit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...api.authHeaders(),
      },
      body: JSON.stringify({ 
        property_id: propertyId, 
        date, 
        time,
        message
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to schedule visit");
    }

    return data;
  },

  // Get scheduled visits
  getScheduledVisits: async (limit = 0) => {
    const url = limit > 0 
      ? `${apiUrl}/user/scheduled-visits?limit=${limit}` 
      : `${apiUrl}/user/scheduled-visits`;
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...api.authHeaders(),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch scheduled visits");
    }

    return data;
  },
};

export default api;
