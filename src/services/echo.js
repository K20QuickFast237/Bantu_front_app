import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import api from './api'; // Pour l'authentification des canaux privés

window.Pusher = Pusher;

const options = {
    broadcaster: import.meta.env.VITE_BROADCAST_CONNECTION,
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT,
    forceTLS: false,
    enabledTransports: ['ws', 'wss'],
    // Point d'authentification pour les canaux privés
    disableStats: true,
    authorizer: (channel, options) => {
        return {
            authorize: (socketId, callback) => {
                api.post('/broadcasting/auth', {
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