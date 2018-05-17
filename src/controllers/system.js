var fs = require('fs')
import path from 'path'
import * as responseTemplate from '../lib/responseTemplate'


export let resetDb = async (ctx) => {
    try {
        await fs.copyFileSync(path.join(__dirname, '../db/db_backup.json'), path.join(__dirname, '../db/db.json'));
        return responseTemplate.success(ctx, "初始化成功")
    } catch (e) {
        console.log(e)
        return responseTemplate.businessError(ctx, "初始化失败")
    }

}
