// auth.js

// Function to check if the user is authenticated
export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };
  
  // Function to get the authentication token
  export const getToken = () => {
    return localStorage.getItem('token');
  };
  
  // Function to set the authentication token
  export const setToken = (token) => {
    localStorage.setItem('token', token);
  };
  
  // Function to log out the user
  export const logout = () => {
    localStorage.removeItem('token');
  };
  