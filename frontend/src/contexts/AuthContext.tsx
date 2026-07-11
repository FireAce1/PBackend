import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const MOCK_USER: any = {
  id: 1,
  name: 'Arjun Singh',
  email: 'arjun@example.com',
  phone: '9876543210',
  preferredLanguage: 'en',
  role: 'USER',
  address: {
    state: 'Punjab',
    district: 'Ludhiana',
    city: 'Ludhiana',
    pincode: '141001',
    latitude: 30.901,
    longitude: 75.857
  },
  householdProfile: {
    adults: 3,
    children: 1,
    elderly: 1,
    pets: 1,
    disabilities: false,
    houseType: 'GROUND_FLOOR',
    floodProneHistory: true
  }
};

interface AuthContextType {
  user: any | null;
  token: string | null;
  loading: boolean;
  login: (credentials: any) => Promise<boolean>;
  register: (data: any) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: any) => Promise<boolean>;
  isMock: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isMock, setIsMock] = useState<boolean>(false);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    const savedIsMock = localStorage.getItem('isMock') === 'true';

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      setIsMock(savedIsMock);
    }
    setLoading(false);
  }, []);

  const login = async (credentials: any): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      if (response.ok) {
        const data = await response.json();
        setToken(data.token);
        setUser(data.user);
        setIsMock(false);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('isMock', 'false');
        return true;
      }
    } catch (e) {
      console.warn('Backend login connection failed, falling back to mock authentication', e);
    }

    // Mock login fallback
    if (credentials.email === 'arjun@example.com' || credentials.email.includes('@')) {
      const mockUserData = { ...MOCK_USER, email: credentials.email };
      setToken('mock-jwt-token-xyz');
      setUser(mockUserData);
      setIsMock(true);
      localStorage.setItem('token', 'mock-jwt-token-xyz');
      localStorage.setItem('user', JSON.stringify(mockUserData));
      localStorage.setItem('isMock', 'true');
      return true;
    }
    return false;
  };

  const register = async (registerData: any): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData)
      });
      if (response.ok) {
        const data = await response.json();
        setToken(data.token);
        setUser(data.user);
        setIsMock(false);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('isMock', 'false');
        return true;
      }
    } catch (e) {
      console.warn('Backend registration failed, falling back to mock registration', e);
    }

    // Mock registration fallback
    const mockUserData = {
      id: Date.now(),
      name: registerData.name,
      email: registerData.email,
      phone: registerData.phone,
      preferredLanguage: registerData.preferredLanguage || 'en',
      role: 'USER',
      address: {
        state: registerData.state,
        district: registerData.district,
        subDistrict: registerData.subDistrict,
        city: registerData.city,
        pincode: registerData.pincode,
        latitude: registerData.latitude || 30.901,
        longitude: registerData.longitude || 75.857
      },
      householdProfile: {
        adults: registerData.adults || 1,
        children: registerData.children || 0,
        elderly: registerData.elderly || 0,
        pets: registerData.pets || 0,
        disabilities: registerData.disabilities || false,
        houseType: registerData.houseType || 'FLAT',
        floodProneHistory: registerData.floodProneHistory || false
      }
    };

    setToken('mock-jwt-token-xyz');
    setUser(mockUserData);
    setIsMock(true);
    localStorage.setItem('token', 'mock-jwt-token-xyz');
    localStorage.setItem('user', JSON.stringify(mockUserData));
    localStorage.setItem('isMock', 'true');
    return true;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setIsMock(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isMock');
  };

  const updateProfile = async (updateData: any): Promise<boolean> => {
    if (!isMock) {
      try {
        const response = await fetch(`${API_BASE_URL}/users/me/profile`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(updateData)
        });
        if (response.ok) {
          const updatedUser = await response.json();
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
          return true;
        }
      } catch (e) {
        console.warn('Backend update failed, updating locally', e);
      }
    }

    // Local / Mock update
    const updatedUser = {
      ...user,
      name: updateData.name || user.name,
      preferredLanguage: updateData.preferredLanguage || user.preferredLanguage,
      address: {
        ...user.address,
        state: updateData.state,
        district: updateData.district,
        subDistrict: updateData.subDistrict,
        city: updateData.city,
        pincode: updateData.pincode,
        latitude: updateData.latitude || user.address.latitude,
        longitude: updateData.longitude || user.address.longitude
      },
      householdProfile: {
        ...user.householdProfile,
        adults: updateData.adults,
        children: updateData.children,
        elderly: updateData.elderly,
        pets: updateData.pets,
        disabilities: updateData.disabilities,
        houseType: updateData.houseType,
        floodProneHistory: updateData.floodProneHistory
      }
    };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, updateProfile, isMock }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
