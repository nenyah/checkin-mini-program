/*
 * @Description: 我的页面
 * @Author: Steven
 * @Date: 2020-04-14 16:24:12
 * @LastEditors: Steven
 * @LastEditTime: 2020-08-04 09:35:43
 */

import moment from "moment"
import {companyName} from "/config/api"
import {getRecord} from "/service/record"
import * as utils from "/util/utils"

Page({
  data: {
    month: "2020-04",
    userInfo: "",
    items: [],
    company: companyName,
  },
  onLoad(query) {
    console.log("我的", query.userid)
    const now = moment()
    const month = now.format("YYYY-MM")

    console.log(month)
    this.setData({
      now,
      month,
      userInfo: query,
    })
    this._getRecord({
      userIds: query.userid,
    })
  },
  pickMonth() {
    // 更改月份
    my.datePicker({
      format: "yyyy-MM",
      currentDate: this.data.month,
      success: (res) => {
        let month = moment(res.date, "YYYY-MM")
        let startDate = month.date(1).format("YYYY-MM-DD")
        let endDate = month.endOf("month").format("YYYY-MM-DD")
        console.log(`startDate:${startDate}, endDate:${endDate}`)
        this.setData({
          month: res.date,
        })
        this._getRecord({
          startDate,
          endDate,
          userIds: this.data.userInfo.userid,
        })

      },
    })
  },
  handleItemClick(e) {
    const item = e.currentTarget.dataset.item
    console.log(e)
    my.navigateTo({
      url: `/pages/checkin/checkin-detail/checkin-detail?item=${JSON.stringify(
        item
      )}`,
    })
  },
  previewImg(e) {
    console.log("预览图片", e)
    my.previewImage({
      urls: [e.currentTarget.dataset.src],
    })
  },
  /**
   * 转到历史记录页
   */
  goToHistory() {
    console.log("到历史页面")
    my.navigateTo({
      url:
        "/pages/checkin/checkin-history/checkin-history?page=profile&items=" +
        JSON.stringify(this.data.items),
    })
  },
  /**
   * 获取签到记录
   * @param options
   * @private
   */
  _getRecord(options) {
    let month = moment(this.data.month, "YYYY-MM")
    let startDate = month.date(1).format("YYYY-MM-DD")
    let endDate = month.endOf("month").format("YYYY-MM-DD")
    let items = []
    console.log(`startDate:${startDate}, endDate:${endDate}`)
    getRecord({userIds: options.userIds, startDate, endDate})
      .then((res) => {
        console.log("月记录", res)
        if (!utils.isEmpty(res.data)) {
          res.data[0].userSignVOList.forEach((element) => {
            element.date = moment(element.date).format("MM月DD日")
            return element
          })
          items = res.data
        }
        this.setData({
          items,
        })
      })
      .catch((err) => console.error(err))
  },
})
