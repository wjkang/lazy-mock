import * as WebSocket from '../lib/wss';
import url from 'url';

const clients = new Map();

function onConnection(ws, req) {
    let location = url.parse(ws.upgradeReq.url, true);
    let clientId = location.query.token || location.query.user;
    if (!clientId) {
        ws.close(500, 'Invalid Client');
    }
    if (clients.has(clientId)) {
        ws.close(500, 'Exist Client');
    }
    ws.clientId = clientId;
    clients.set(clientId, ws);
}
function onMessage() {
    let clientId = this.clientId;

}
function onClose() {

}
function onError() {

}

export default {
    start: function () {
        let wss = WebSocket.createServer(onConnection, onMessage, onClose, onError);
        return wss;
    }
}

