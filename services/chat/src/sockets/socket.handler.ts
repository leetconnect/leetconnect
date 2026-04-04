import type { Server, Socket } from 'socket.io';

export function setup_sockets(io: Server) {
	io.on('connection', (socket: Socket) => {
		console.log(`socket connected: ${socket.id}`);

		socket.on('join_convers', (convers_id: number) => {
			const room = `convers:${convers_id}`;
			socket.join(room);
			console.log(`socket ${socket.id} joined room ${room}`);
		});
		socket.on('leave_covers', (convers_id: number) => {
			const room = `convers:${convers_id}`;
			socket.leave(room);
			console.log(`socket ${socket.id} left room ${room}`);
		})
		socket.on('disconnect', (reason: string) => {
			console.log(`socket disconnected: ${socket.id} (${reason})`);
		});
	});
}
