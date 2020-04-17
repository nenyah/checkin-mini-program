const ApiRootUrl = "http://127.0.0.1:8000/api/";

module.exports = {
  Userinfo: ApiRootUrl + "userinfo", //获取用户信息
  CheckInRecord: ApiRootUrl + "checkinrecord", // 签到历史记录
  Clientsinfo: ApiRootUrl + "clients", // 客户信息
  Clientslabels: ApiRootUrl + "clientslabel", //客户标签
  timeout: 5000, // 超时
};
