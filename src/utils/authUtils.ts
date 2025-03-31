
// Simple auth utilities for demo purposes
// In a real app, you'd use a proper authentication system

export const checkIsAdmin = (): boolean => {
  const isAdmin = localStorage.getItem('isAdmin');
  return isAdmin === 'true';
};

export const getCurrentUser = () => {
  const userJson = localStorage.getItem('user');
  if (userJson) {
    try {
      return JSON.parse(userJson);
    } catch (e) {
      return null;
    }
  }
  return null;
};

export const logout = () => {
  localStorage.removeItem('isAdmin');
  localStorage.removeItem('user');
};
