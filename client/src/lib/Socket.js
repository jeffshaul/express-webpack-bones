import { io } from 'socket.io-client';

export default class Socket {
    constructor() {
        this.socket = io();

        // Handshake
        this.socket.emit('Hello from client');
        this.socket.on('Hello from server', (...payload) => {
            console.log('Connection established');
        });
    }
}