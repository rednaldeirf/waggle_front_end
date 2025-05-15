import axios from "axios";

const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.warn("No token found in localStorage");
    return null;
  }
  return `Bearer ${token}`;
};

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://waggle-backend-910d4cca91b5.herokuapp.com"
      : "http://localhost:8000",
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor
api.interceptors.request.use(
  function (config) {
    const token = getToken();
    console.log("API Request:", {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data,
      hasToken: !!token
    });
    
    if (token) {
      config.headers["Authorization"] = token;
    } else {
      console.warn("No token available for request to:", config.url);
    }
    return config;
  },
  function (error) {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  function (response) {
    console.log("API Response:", {
      url: response.config.url,
      status: response.status,
      data: response.data,
      headers: response.headers
    });
    return response;
  },
  function (error) {
    console.error("API Error:", {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      headers: error.config?.headers
    });

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      console.warn("Authentication token expired or invalid");
      localStorage.removeItem("token");
      // Redirect to login page
      window.location.href = '/';
    }

    return Promise.reject(error);
  }
);

export default api;

