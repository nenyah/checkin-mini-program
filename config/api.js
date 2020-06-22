/*
 * @Description: 接口
 * @Author: Steven
 * @Date: 2020-04-30 16:37:22
 * @LastEditors: Steven
 * @LastEditTime: 2020-06-12 11:53:13
 */ 
let dev = false;
let RootUrl, ApiRootUrl, ConfigUrl;
if (dev) {
  RootUrl = "http://192.168.13.170:9102";
} else {
  RootUrl = "http://www2.huadongbio.com:9102";
}
ApiRootUrl = RootUrl + "/ding/";
ConfigUrl = RootUrl + "/config/";
// 地图标签
http: const markers = [
  {
    iconPath: "/assets/images/location.png",
    width: 26,
    height: 26,
  },
];

module.exports = {
  Userinfo: ApiRootUrl + "auth", // 获取用户信息
  Clientsinfo: ApiRootUrl + "org", // 机构信息
  Customerinfo: ApiRootUrl + "customer/customer", // 客户信息

  DeptInfo: ApiRootUrl + "dept", //所在部门信息

  CheckInRecord: ApiRootUrl + "signin", // 个人签到历史记录
  StaffDayRecord: ApiRootUrl + "signin/oneDay", // 指定用户指定日期签到信息
  StaffMonthRecord: ApiRootUrl + "signin/monthStatistic", // 指定用户当月签到信息
  DeptRecord: ApiRootUrl + "signin/ownDept", //所在部门签到信息
  UploadFile: ApiRootUrl + "signin/uploadImg", //上传图片
  TodayCount: ApiRootUrl + "signin/todayCount", //当前用户当天签到记录
  Config: ConfigUrl + "simple/one", //获取配置信息

  timeout: 5000, // 超时
  companyName: "华东宁波医药有限公司", //默认公司名
  markers: markers, // 地图标签
  debug: dev,
  limitRange: 200,
  compressLevel: 4,
};
