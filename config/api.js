const ApiRootUrl = "http://192.168.13.170:9102/";
// 地图标签
const markers = [
  {
    iconPath: "/assets/images/location.png",
    width: 26,
    height: 26
  }
];

module.exports = {
  Userinfo: ApiRootUrl + "ding/signin/auth/token", // 获取用户信息
  CheckInRecord: ApiRootUrl + "ding/signin/get", // 签到历史记录
  CreateCheckInRecord: ApiRootUrl + "ding/signin/create", //提交签到信息
  Clientsinfo: ApiRootUrl + "ding/signin/org", // 客户信息
  Clientslabels: ApiRootUrl + "ding/signin/orgGroup", //客户标签
  timeout: 5000, // 超时

  companyName: "华东宁波医药有限公司", //默认公司名

  markers: markers
};
