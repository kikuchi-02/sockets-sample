import * as dgram from 'dgram';

const PORT_A = 3002;
const HOST_A = '127.0.0.1';

const PORT_B = 3003;
const HOST_B = '127.0.0.1';

(() => {

  const socket = dgram.createSocket('udp4');

  socket.on('listening', () => {
    const address = socket.address();
    console.log('UDP socket listening on ' + address.address + ":" + address.port);
  });

  socket.on('message', (message, remote) => {
    console.log(remote.address + ':' + remote.port + ' - ' + message);

    socket.send(message, 0, message.length, PORT_B, HOST_B, (err, bytes) => {
      if (err) throw err;
    });
  });

  socket.bind(PORT_A, HOST_A);
})();