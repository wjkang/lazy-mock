const WebSocket = require('ws');
import {
    System as SystemConfig
} from '../config'

export function createServer(onConnection, onMessage, onClose, onError) {
    onConnection = onConnection || function () {
        console.log('[WebSocket] connected.');
    };
    onMessage = onMessage || function (msg) {
        console.log('[WebSocket] message received: ' + msg);
    };
    onClose = onClose || function (code, message) {
        console.log(`[WebSocket] closed: ${code} - ${message}`);
    };
    onError = onError || function (err) {
        console.log('[WebSocket] error: ' + err);
    };

    let wss = new WebSocket.Server(SystemConfig.WS_CONFIG);
    console.log('Now start WebSocket server on port ' + SystemConfig.WS_CONFIG.port + '...')

    //广播
    wss.broadcast = function broadcast(data, selfname) {
        wss.clients.forEach(function each(client) {
            console.log("client.user:", client.user);
            data.username = client.user.user.username;
            if (client.readyState === WebSocket.OPEN && selfname != client.user.user.username) {
                client.send(data);
            }
        });
    };
    //处理connect
    wss.on('connection', function (ws, req) {
        onConnection(ws, req);
        ws.on('message', onMessage);
        ws.on('close', onClose);
        ws.on('error', onError);
    });

    return wss;
}

