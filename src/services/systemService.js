import model from '../models/baseModel'

module.exports = {
    resetDb:async()=>{
       await model.read()
    }
}