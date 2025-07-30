import { io } from 'socket.io-client';

const socket = io('http://localhost:3003'); // Porta do socket-service

export default socket;