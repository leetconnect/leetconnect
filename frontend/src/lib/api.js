// API client utility for frontend
// All requests go through Nginx proxy (relative paths)
// Automatically attaches JWT token from localStorage

const API_BASE = '/api';

export async function api(path, options = {}) {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers,
        },
        ...options,
    };

    // Stringify body if it's an object
    if (config.body && typeof config.body === 'object') {
        config.body = JSON.stringify(config.body);
    }

    const res = await fetch(`${API_BASE}${path}`, config);

    if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(err.error || `Request failed: ${res.status}`);
    }

    return res.json();
}

// Convenience methods
export const authApi = {
    login: (data) => api('/auth/login', { method: 'POST', body: data }),
    register: (data) => api('/auth/register', { method: 'POST', body: data }),
    me: () => api('/auth/me'),
    health: () => api('/auth/health'),
};

export const marketApi = {
    getJobs: () => api('/market/jobs'),
    getJob: (id) => api(`/market/jobs/${id}`),
    createJob: (data) => api('/market/jobs', { method: 'POST', body: data }),
    health: () => api('/market/health'),
};

export const chatApi = {
    getConversations: () => api('/chat/conversations'),
    getMessages: (convId) => api(`/chat/conversations/${convId}/messages`),
    health: () => api('/chat/health'),
};

export const analyticsApi = {
    getDashboard: () => api('/analytics/dashboard'),
    health: () => api('/analytics/health'),
};

export const adminApi = {
    getUsers: () => api('/admin/users'),
    health: () => api('/admin/health'),
};
