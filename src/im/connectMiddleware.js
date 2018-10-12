import url from 'url';
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import userService from '../services/userService'
import roomService from '../services/chatRoomService'
const publicKey = fs.readFileSync(path.join(__dirname, '../../publicKey.pub'))

function makeEvent(event) {
    return JSON.stringify({
        type: 'event',
        event: event.event,
        args: event.args
    })
}

export default () => {
    return async function (context, next) {
        let req = context.req;
        let client = context.client;
        let server = context.server;
        let location = url.parse(req.url, true);
        let token = location.query.token;
        if (!token) {
            client.send(makeEvent({
                event: 'connectError',
                args: 'invalid token'
            }))
            client.close(1003, "invalid token");
            return;
        }
        let decoded = null;
        try {
            decoded = jwt.verify(token, publicKey.toString());
        } catch (err) {
            console.log(err)
            client.send(makeEvent({
                event: 'connectError',
                args: 'invalid token'
            }))
            client.close(1003, "invalid token");
            return;
        }
        let userId = decoded.userId;
        if (server.clients.has(userId)) {
            client.send(makeEvent({
                event: 'connectError',
                args: 'user online'
            }))
            client.close(1003, "user online");
            return;
        }
        let user = await userService.getUserById(userId);
        if (!user) {
            client.send(makeEvent({
                event: 'connectError',
                args: 'invalid token'
            }))
            client.close(1003, "invalid token");
            return;
        }
        user = {
            id: userId,
            name: user.name
        };
        client.clientId = userId;
        server.clients.set(userId, client);
        if (!server.userMap) {
            server.userMap = new Map();
        }
        if (!server.roomMap) {
            server.roomMap = new Map();
            let roomList = await roomService.getChatRoomPagedList();
            for (let room of roomList.rows) {
                server.roomMap.set(room.id, {
                    ...room,
                    userList: []
                })
            }
        }
        server.userMap.set(userId, user);
        server.emit('userConnect', {
            id: userId,
            name: user.name
        });
        client.send(makeEvent({
            event: 'connectSuccess',
            args: {
                user: user,
                userList: [...server.userMap.values()],
                roomList: [...server.roomMap.values()]
            }
        }));
        console.log(client.clientId + " Connected");
        next();
    }
}