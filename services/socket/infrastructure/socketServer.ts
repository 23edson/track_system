import socketIO from 'socket.io';
import http from 'http';


export interface SocketServer {
    on(event: string, listener: (...args: any[]) => void): this;
    onConnection(listener: (socket: any) => void): this;
}


export class SocketIOServer implements SocketServer {
    private io: any;
    private server: http.Server;

    constructor(server: http.Server) {

        this.server = server
        this.io = new socketIO.Server(server, {
            cors: {
                origin: '*',
                methods: ['GET', 'POST']
            }
        });
    }

    listen(port: number, callback?: () => void): void {
        this.server.listen(port, callback);
    }

    on(event: string, listener: (...args: any[]) => void): this {
        this.io.on(event, listener);
        return this;
    }

    onConnection(listener: (socket: any) => void): this {
        this.io.on('connection', listener);
        return this;
    }
}