import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
const WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL || 'ws://localhost:3000';


const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

api.interceptors.request.use(
    (config) => {
        config.headers['Access-Control-Allow-Origin'] = '*';
        config.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, PATCH, DELETE, OPTIONS';
        config.headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization, X-Auth-Token', 'X-Requested-With';
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if(error.response) {
            return Promise.reject(error.response.data);
        }
        return Promise.reject(error.response.data);
    }
);


export function createWebSocketConnection(path = '') {
    // Permite conectar a un path específico en el WS_BASE_URL
    const wsUrl = `${WS_BASE_URL}${path}`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
        console.log('WebSocket connection opened:', wsUrl);
    };

    ws.onclose = (event) => {
        console.log('WebSocket connection closed:', event);
    };

    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    ws.onmessage = (message) => {
        console.log('Received message via WebSocket:', message.data);
    };

    return ws;
}
export default api;
export { api, BASE_URL, WS_BASE_URL };

