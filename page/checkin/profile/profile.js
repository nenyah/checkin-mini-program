import moment from "moment";
import { getMonthRecord } from "/service/record";
import { companyName } from "/config/api";

Page({
  data: {
    month: "2020-04",
    userInfo: "",
    items: [],
    company: companyName,
  },
  onLoad(query) {
    console.log("我的", query.userid);
    this.setData({
      userInfo: query,
    });
    const month = moment(new Date()).format("YYYY-MM");
    console.log(month);
    this.setData({
      month,
    });
    this._getMonthRecord({
      dingUserId: query.userid,
    });
  },
  pickMonth() {
    // 更改月份
    my.datePicker({
      format: "yyyy-MM",
      currentDate: this.data.month,
      success: (res) => {
        this.setData({
          month: res.date,
        });
        // TODO 向服务器获取对应月份历史记录
        // 或者从缓存中获取？
      },
    });
  },
  handleItemClick(e) {
    const item = e.currentTarget.dataset.item;
    console.log(e);
    my.navigateTo({
      url: `/page/checkin/checkin-detail/checkin-detail?item=${JSON.stringify(
        item
      )}`,
    });
  },
  _getMonthRecord(options) {
    getMonthRecord({ ...options, size: 200 })
      .then((res) => {
        console.log("月记录", res);
        let items = res
        items.signInMonthDTOS.forEach(element => {
          element.date = moment(element.date).format('MM月DD日');
          element.signInHisVOS.forEach(element => {
            element.place = element.detailPlace;
            return  element
          });
          return element
        });
        this.setData({
          items:res,
        });
      })
      .catch((err) => console.error(err));
  },
});
