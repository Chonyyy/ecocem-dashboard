// Function to check if the user is authenticated by checking the presence of a cookie
export const isAuthenticated = () => {
  return true//TODO: If needed implement proper route authentication
  return document.cookie.split(';').some((item) => item.trim().startsWith('token='));
};

// Function to log out the user by removing the cookie
export const logout = () => {
  document.cookie = 'token=; Max-Age=0; path=/';
};
  