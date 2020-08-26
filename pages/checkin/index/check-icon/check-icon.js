/*
 * @Description: 签到图标组件
 * @Author: Steven
 * @Date: 2020-04-14 12:36:19
 * @LastEditors: Steven
 * @LastEditTime: 2020-08-04 09:57:23
 */

let app = getApp()
Component({
  mixins: [],
  data: {},
  props: {
    client: "",
    ctime: "00:00",
    checkTimes: 0,
    onSubmit: () => {
    },
  },
  didMount() {
  },
  didUpdate() {
  },
  didUnmount() {
  },
  methods: {
    goSubmit() {
      this.props.onSubmit()
    },
    goTest() {
      my.navigateTo({
        url: "/pages/test/test",
      })
    },
  },
})
