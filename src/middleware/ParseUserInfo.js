import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
const publicKey = fs.readFileSync(path.join(__dirname, '../../publicKey.pub'))

module.exports = function () {
    return function (ctx, next) {
        if (ctx.request.header.authorization) {
            let token = ctx.header.authorization.split(' ')[1]
            if (token&&token!=='undefined') {
                let decoded = jwt.verify(token, publicKey)
                if (decoded.userId) {
                    ctx.user = {
                        token: token,
                        userId: decoded.userId
                    }
                }
            }
        }
        return next()
    }
}