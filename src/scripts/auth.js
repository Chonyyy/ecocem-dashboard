import axios from 'axios';

export const isAuthenticated = () => {
  return true//TODO: If needed implement proper route authentication
  return document.cookie.split(';').some((item) => item.trim().startsWith('token='));
};

export const logout = () => {
  document.cookie = 'token=; Max-Age=0; path=/';
};

export const checkAuth = async () => {
  try {
    const response = await axios.get('/Ok/user'); 
    if (response.status === 200) {
      return true
    } else {
      return false
    }
  } catch (error) {
    return false
  }
};

export const checkAdmin = async () => {
  try {
    const response = await axios.get('/Ok/admin'); 
    if (response.status === 200) {
      return true
    } else {
      return false
    }
  } catch (error) {
    return false
  }
}
  