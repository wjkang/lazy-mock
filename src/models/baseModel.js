import path from 'path'

const low = require('lowdb')
const lodashId = require('lodash-id')
const FileAsync = require('lowdb/adapters/FileAsync')
const dbFile = path.join(__dirname, '../db/db.json')
const adapter = new FileAsync(dbFile)
let instance = undefined
module.exports = {
    init: function (context) {
        return new Promise((resolve, reject) => {
            if (instance === undefined) {
                low(adapter).then(db => {
                    db._.mixin(lodashId)
                    instance = db;
                    resolve(db.get(context))
                })
            } else {
                resolve(instance.get(context))
            }
        })
    },
    read: () => {
        return new Promise((resolve, reject) => {
            if (instance === undefined) {
                resolve()
            }
            else {
                instance.read().then(() => {
                    resolve()
                })
            }
        })
    }

}
