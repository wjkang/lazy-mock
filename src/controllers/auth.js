import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import * as responseTemplate from '../lib/responseTemplate'
import userService from '../services/userService'
import tokenService from '../services/tokenService'

const publicKey = fs.readFileSync(path.join(__dirname, '../../publicKey.pub'))

export let CheckAuth = (ctx) => {
  let token = ctx.request.header.authorization
  try {
    let decoded = jwt.verify(token.substr(7), publicKey)
    if (decoded.userInfo) {
      return {
        status: 1,
        result: decoded.userInfo
      }
    } else {
      return {
        status: 403,
        result: {
          errInfo: '没有授权'
        }
      }
    }
  } catch (err) {
    return {
      status: 503,
      result: {
        errInfo: '解密错误'
      }
    }
  }
}

export let Post = (ctx) => {
  switch (ctx.params.action) {
    case 'check':
      return CheckAuth(ctx).then(result => { ctx.body = result })
    default:
      return CheckAuth(ctx).then(result => { ctx.body = result })
  }
}

export let login = async (ctx) => {
  let name = ctx.request.body.username
  let pwd = ctx.request.body.password
  if (!name || !pwd) {
    return responseTemplate.businessError(ctx, '请输入账号密码!')
  }
  let user = await userService.getUserByNameAndPwd(name, pwd)
  if (!user) {
    return responseTemplate.businessError(ctx, '账号或密码错误!')
  }
  let token = jwt.sign({
    userId: user.id // 你要保存到token的数据
  }, publicKey, { expiresIn: '7d' })
  //await tokenService.add(token)
  return responseTemplate.success(ctx, {
    accessToken: token
  })
}

export let logout = async (ctx) => {
  let user = ctx.user;
  if (!user || !user.token) {
    return responseTemplate.success(ctx, null)
  }
  await tokenService.remove(user.token)
  return responseTemplate.success(ctx, null)
}
