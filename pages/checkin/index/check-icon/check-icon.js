/*
 * @Description: 签到图标组件
 * @Author: Steven
 * @Date: 2020-04-14 12:36:19
 * @LastEditors: Steven
 * @LastEditTime: 2020-06-22 13:14:11
 */ 
import { urlEncode } from "/util/utils";
let app = getApp();
Component({
  mixins: [],
  data: {},
  props: {
    client: "",
    ctime: "00:00",
    checkTimes: 0,
    onSubmit: () => {},
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    goSubmit() {
      this.props.onSubmit()
    },
    goTest() {
      my.navigateTo({
        url: "/pages/test/test",
      });
    },
  },
});
