import {request, uploadFile} from "./network"
import {CheckinRecord, UploadFile} from "/config/api"


/**
 * 获取签到记录
 * @param {number} current 当前页码
 * @param {number} size 每页条数
 * @param {array<number>} userIds 用户id列表
 * @param {string} startDate 开始日期，默认当天，格式：yyyy-MM-dd
 * @param {string} endDate 结束日期，默认当天，格式：yyyy-MM-dd
 * @return {Promise}
 */
function getRecord({
                     current = 1,
                     size = 10,
                     userIds,
                     startDate,
                     endDate,
                   }) {
  return request({
    url: CheckinRecord,
    data: {
      current,
      size,
      userIds,
      startDate,
      endDate
    },
  })
}

/**
 * 上传签到信息
 * @param {object} org 机构
 * @param {number} org.id 机构id
 * @param {string} org.name 机构名称
 * @param {number} timeStamp 时间戳
 * @param {array<string>} imageUrlList 图片url列表
 * @param {string} place 地址
 * @param {string} detailPlace 详细地址
 * @param {string} remark 备注
 * @param {number} longitude 经度
 * @param {number} latitude 纬度
 * @return {Promise}
 */
function setRecord({
                     org,
                     timeStamp,
                     imageUrlList = [],
                     place,
                     detailPlace,
                     remark = "",
                     longitude,
                     latitude,
                   }) {
  return request({
    url: CheckInRecord,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      org,
      timeStamp,
      imageUrlList,
      place,
      detailPlace,
      remark,
      longitude,
      latitude,
    }),
  })
}

/**
 * 上传文件
 * @param {string} filePath 文件路径
 * @param {object} formData 上传附加内容
 * @return {Promise}
 */
function setRecordFile({filePath, formData}) {
  return uploadFile({
    url: UploadFile,
    filePath: filePath,
    formData: formData || {detailPlace: "测试地址"},
  })
}


module.exports = {
  getRecord,
  setRecord,
  setRecordFile,
}
