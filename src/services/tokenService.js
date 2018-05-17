import model from '../models/baseModel'
import { exists } from 'fs';
const context = 'token'
module.exports = {
    add: async (token) => {
        let db = await model.init(context)
        await db.push({ value: token }).write()
    },
    exist: async (token) => {
        let db = await model.init(context)
        let exist = db.find({ value: token })
            .value()
        if (exist) {
            return true
        } else {
            return false
        }
    },
    remove: async (token) => {
        let db = await model.init(context)
        await db.remove({ value: token })
            .write()
    }
}