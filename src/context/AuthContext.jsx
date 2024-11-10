import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const api = axios.create({
  baseURL: 'http://36.255.69.139:9090/api',
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [oems, setOems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      fetchOems(storedUser.token);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/Login', { email, password });
      const userData = { email, token: response.data.token };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      await fetchOems(response.data.token);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setOems([]);
    localStorage.removeItem('user');
  };

  const refreshToken = async () => {
    if (user && user.token) {
      try {
        const response = await api.post('/Login/GetToken', null, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const updatedUser = { ...user, token: response.data.token };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      } catch (error) {
        console.error('Failed to refresh token:', error);
        logout();
      }
    }
  };

  const fetchOems = async (token) => {
    try {
      const response = await fetch('http://36.255.69.139:9090/api/Oems', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch OEMs');
      }
      const responseData = await response.json();
      setOems(responseData.oems || []);
      return responseData.oems;
    } catch (error) {
      console.error('Error fetching OEMs:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, oems, login, logout, refreshToken, fetchOems, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


