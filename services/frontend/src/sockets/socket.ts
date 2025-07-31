import { io } from 'socket.io-client';

const socket = io('http://localhost:4000'); // Porta do socket-service

export default socket;