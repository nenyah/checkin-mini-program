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
        this._getMonthRecord({
          month: res.date,
          dingUserId: this.data.userInfo.userid,
        });
        this.setData({
          month: res.date,
        });
      },
    });
  },
  handleItemClick(e) {
    const item = e.currentTarget.dataset.item;
    console.log(e);
    my.navigateTo({
      url: `/pages/checkin/checkin-detail/checkin-detail?item=${JSON.stringify(
        item
      )}`,
    });
  },
  previewImg(e) {
    console.log("预览图片", e);
    my.previewImage({
      urls: [e.currentTarget.dataset.src],
    });
  },
  goToHistory() {
    console.log("到历史页面");
    my.navigateTo({
      url:
        "/pages/checkin/checkin-history/checkin-history?page=profile&items=" +
        JSON.stringify(this.data.items),
    });
  },
  _getMonthRecord(options) {
    getMonthRecord({ ...options })
      .then((res) => {
        console.log("月记录", res);
        let items = res;
        items.signInMonthDTOS.forEach((element) => {
          element.date = moment(element.date).format("MM月DD日");
          // element.signInHisVOS.forEach((element) => {
          //   // element.place = element.detailPlace;
          //   return element;
          // });
          return element;
        });
        this.setData({
          items: res,
        });
      })
      .catch((err) => console.error(err));
  },
});
