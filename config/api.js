const ApiRootUrl = "http://127.0.0.1:8000/api/";
// 地图标签
const markers = [
  {
    iconPath: "/assets/images/location.png",
    width: 26,
    height: 26,
  },
];

module.exports = {
  Userinfo: ApiRootUrl + "userinfo", //获取用户信息
  CheckInRecord: ApiRootUrl + "checkinrecord", // 签到历史记录
  Clientsinfo: ApiRootUrl + "clients", // 客户信息
  Clientslabels: ApiRootUrl + "clientslabel", //客户标签
  timeout: 5000, // 超时

  companyName: "华东宁波医药有限公司", //默认公司名

  markers: markers,
};
