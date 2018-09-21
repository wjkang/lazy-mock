import compose from './compose';
const WebSocket = require('ws');
var EventEmitter = require('events').EventEmitter;
export default class EasySocket extends EventEmitter {
    constructor() {
        super();
        this.clients = new Map();
        this.connectionMiddleware = [];
        this.closeMiddleware = [];
        this.messageMiddleware = [];
        this.errorMiddleware = [];
        this.remoteEmitMiddleware = [];

        this.connectionFn = Promise.resolve();
        this.closeFn = Promise.resolve();
        this.messageFn = Promise.resolve();
        this.errorFn = Promise.resolve();
        this.remoteEmitFn = Promise.resolve();
    }
    connectionUse(fn, runtime) {
        this.connectionMiddleware.push(fn);
        if (runtime) {
            this.connectionFn = compose(this.connectionMiddleware);
        }
        return this;
    }
    closeUse(fn, runtime) {
        this.closeMiddleware.push(fn);
        if (runtime) {
            this.closeFn = compose(this.closeMiddleware);
        }
        return this;
    }
    messageUse(fn, runtime) {
        this.messageMiddleware.push(fn);
        if (runtime) {
            this.messageFn = compose(this.messageMiddleware);
        }
        return this;
    }
    errorUse(fn, runtime) {
        this.errorMiddleware.push(fn);
        if (runtime) {
            this.errorFn = compose(this.errorMiddleware);
        }
        return this;
    }
    remoteEmitUse(fn, runtime) {
        this.remoteEmitMiddleware.push(fn);
        if (runtime) {
            this.remoteEmitFn = compose(this.remoteEmitMiddleware);
        }
        return this;
    }
    listen(config) {
        this.socket = new WebSocket.Server(config);
        this.connectionFn = compose(this.connectionMiddleware);
        this.messageFn = compose(this.messageMiddleware);
        this.closeFn = compose(this.closeMiddleware);
        this.errorFn = compose(this.errorMiddleware);
        this.remoteEmitFn = compose(this.remoteEmitMiddleware);

        this.socket.on('connection', (client, req) => {
            let context = { server: this, client, req };
            this.connectionFn(context).catch(error => { console.log(error) });

            client.on('message', (message) => {
                let req;
                try {
                    req = JSON.parse(message);
                } catch (error) {
                    req = message;
                }
                let messageContext = { server: this, client, req }
                this.messageFn(messageContext).catch(error => { console.log(error) })
            });

            client.on('close', (code, message) => {
                let closeContext = { server: this, client, code, message };
                this.closeFn(closeContext).catch(error => { console.log(error) })
            });

            client.on('error', (error) => {
                let errorContext = { server: this, client, error };
                this.errorFn(errorContext).catch(error => { console.log(error) })
            });
        })
    }
    emit(event, args, isLocal = false) { 
        let arr = [event, args];
        if (isLocal) {
            super.emit.apply(this, arr);
            return this;
        }
        let evt = {
            event: event,
            args: args
        }
        let remoteEmitContext = { server: this, event: evt };
        this.remoteEmitFn(remoteEmitContext).catch(error => { console.log(error) })
        return this;
    }
}