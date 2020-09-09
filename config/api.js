/*
 * @Description: 接口
 * @Author: Steven
 * @Date: 2020-04-30 16:37:22
 * @LastEditors: Steven
 * @LastEditTime: 2020-06-22 13:46:13
 */

let dev = false
let RootUrl, ApiRootUrl
if (dev) {
  RootUrl = "http://192.168.0.175:10002"
} else {
  RootUrl = "http://www1.huadongbio.com:10002"
}
ApiRootUrl = RootUrl + "/ding/"
// 地图标签
const markers = [
  {
    iconPath: "/assets/images/location.png",
    width: 26,
    height: 26,
    id: 1,
  },
]
const tabs = [
  {
    title: "我负责的",
    subTitle: "",
    number: "0",
  },
  {
    title: "共享给我的",
    subTitle: "",
    number: "1",
  },
  {
    title: "全公司的",
    subTitle: "",
    number: "2",
  },
  {
    title: "无人负责的",
    subTitle: "",
    number: "3",
  },
]
module.exports = {
  // 认证授权
  AuthInfo: `${ApiRootUrl}auth`, // 获取用户信息

  // 机构列表
  ClientsInfo: `${ApiRootUrl}org`, // 机构信息

  // 用户信息
  UserInfo: `${RootUrl}/user`, // 用户信息
  UserInfoByCode: `${RootUrl}/user/bycode`, // 通过工号获取用户信息
  DeptUserInfo: `${RootUrl}/user/dept`, // 部门内用户信息
  SubUserInfo: `${RootUrl}/user/sub`, // 用户和下属信息

  // 部门信息
  DeptInfo: `${RootUrl}/dept`, // 部门信息

  // 签到信息
  CheckinRecord: `${ApiRootUrl}sign`, // 个人签到信息 get 获取 post 新增
  UploadFile: `${ApiRootUrl}sign/uploadImg`, //上传图片

  // 配置信息
  ConfigInfo: `${RootUrl}/webSetting`, //获取配置信息

  // 其他
  timeout: 5000, // 超时
  companyName: "华东宁波医药有限公司", //默认公司名
  markers, // 地图标签
  debug: dev,
  limitRange: 200, //地图周边范围
  compressLevel: 4, //压缩等级
  tabs, // 客户标签
}
