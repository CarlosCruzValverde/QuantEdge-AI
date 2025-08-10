import { io } from 'socket.io-client';
const socket = io("https://api.quantedge.ai", {
    transports: ['websocket'],
});
export default socket;
