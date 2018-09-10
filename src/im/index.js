import * as WebSocket from '../lib/wss';
import url from 'url';

const clients = new Map();

function makeMessage(obj) {
    return JSON.stringify(obj);
}

function onConnection(ws, req) {
    let location = url.parse(req.url, true);
    let clientId = location.query.token || location.query.user;
    if (!clientId) {
        ws.end(makeMessage({
            code: 500,
            msg: 'invalid clientId'
        }))
        ws.close(1003, "invalid clientId");
        return;
    }
    if (clients.has(clientId)) {
        ws.send(makeMessage({
            code: 500,
            msg: 'exists clientId'
        }))
        ws.close(1003, "exists clientId");
        return;
    }
    ws.send(makeMessage({
        code: 200,
        msg: 'Wellcome'
    }))
    ws.clientId = clientId;
    clients.set(clientId, ws);
    console.log(ws.clientId + " Connected");
}
function onMessage() {
    let clientId = this.clientId;

}
function onClose(code, reason) {
    if (code === 1003 && (reason === 'invalid clientId' || reason === 'exists clientId')) {
        console.log("'invalid clientId' or 'exists clientId' closed")
    } else {
        console.log(this.clientId + " closed");
    }
}
function onError() {

}

export default {
    start: function () {
        let wss = WebSocket.createServer(onConnection, onMessage, onClose, onError);
        return wss;
    }
}

