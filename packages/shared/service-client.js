// HTTP client for inter-service communication
// Usage: const {callService} = require('../shared/service-client');
//        const users = await callService('http://auth:3001', '/api/auth/users', {headers: {Authorization: 'Bearer ...'}});

async function callService(baseUrl, path, options = {}) {
    const url = `${baseUrl}${path}`;
    const res = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    });
    if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        const err = new Error(body.error || `Service call failed: ${res.status}`);
        err.status = res.status;
        throw err;
    }
    return res.json();
}

module.exports = { callService };
