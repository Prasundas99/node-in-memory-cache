import * as net from 'net';
import { loadFromDisk } from './utils/loadFromDisk';
import { handleActions } from './store/handleActions';
import { ActionTypes } from './store/ActionTypes';

loadFromDisk();

const server = net.createServer((socket: net.Socket) => {
  console.log('Client connected');

  socket.on('data', (data) => {
    const command = data.toString().trim().split(' ');
    const action  = command[0].toUpperCase() as ActionTypes;

    handleActions(action, command, socket);

  });

  socket.on('end', () => {
    console.log('Client disconnected');
  });
});

server.listen(6379, () => {
  console.log('Server listening on port 6379');
});
