import {request} from "/service/network"
import {UserInfoByCode} from "/config/api"

/**
 * 通过工号获取用户信息
 * @param {array<string>}userJobNumbers
 * @return {Promise}
 */
export function getUserByCode({userJobNumbers}) {
  return request({
    url: UserInfoByCode,
    data: {
      userJobNumbers,
    },
  })
}