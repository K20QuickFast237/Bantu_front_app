import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import api from './api'; // Pour l'authentification des canaux privés

window.Pusher = Pusher;

const appKey = String(import.meta.env.VITE_REVERB_APP_KEY || '');

if (!appKey) {
    console.error('VITE_REVERB_APP_KEY is not set in your environment variables.');
}

const options = {
    broadcaster: "reverb",
    key: appKey,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT,
    wssPort: import.meta.env.VITE_REVERB_PORT,
    forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
    enabledTransports: ['ws', 'wss'],
    // Point d'authentification pour les canaux privés
    disableStats: true,
    authorizer: (channel, options) => {
        return {
            authorize: (socketId, callback) => {
                api.post('/api/broadcasting/auth', {
                    socket_id: socketId,
                    channel_name: channel.name,
                })
                .then(response => callback(null, response.data))
                .catch(error => callback(error));
            }
        };
    },
};

const echo = new Echo(options);

export default echo;