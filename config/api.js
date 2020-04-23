const ApiRootUrl = "http://192.168.10.115:9104/ding/";
// 地图标签
const markers = [
  {
    iconPath: "/assets/images/location.png",
    width: 26,
    height: 26,
  },
];

module.exports = {
  Userinfo: ApiRootUrl + "auth", // 获取用户信息
  CheckInRecord: ApiRootUrl + "signin", // 签到历史记录
  Clientsinfo: ApiRootUrl + "org", // 客户信息

  timeout: 5000, // 超时

  companyName: "华东宁波医药有限公司", //默认公司名

  markers: markers, // 地图标签

  debug: false,
  limitRange: 50,
};
