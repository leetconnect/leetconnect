import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, setAccessToken, type User } from '../lib/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  jobs: Job[];
  login: (data: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
}

type Job = {
  id: string | number;
  title: string;
  description: string;
  budget: number;
  category: string;
  skills: string[];
  client: {
    name: string;
    rating: number;
  };
  createdAt: string;
};


const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await api<{ jobs: Job[] }>("/jobs");
        setJobs(data.jobs);
      } catch (error) {
        console.error("Erreur fetch jobs:", error);
        setJobs([]);
      } 
    };

    fetchJobs();
  }, []);



  useEffect(() => {
    // On startup, try to get current user. 
    // If accessToken is null, api() will automatically try to /refresh via cookie.
    const initAuth = async () => {
      try {
        const userData = await api<User>('/auth/me');
        setUser(userData);
      } catch (e) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = async (data: any) => {
    const res = await api<{ accessToken: string, user: User }>('/auth/login', {
      method: 'POST',
      body: data
    });
    setAccessToken(res.accessToken);
    setUser(res.user);
  };

  const register = async (data: any) => {
    const res = await api<{ accessToken: string, user: User }>('/auth/register', {
      method: 'POST',
      body: data
    });
    setAccessToken(res.accessToken);
    setUser(res.user);
  };

  const logout = async () => {
    await api('/auth/logout', { method: 'POST' });
    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout , jobs}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;