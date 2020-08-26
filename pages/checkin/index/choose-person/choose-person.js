/*
 * @Description: 选择客户
 * @Author: Steven
 * @Date: 2020-04-13 15:35:39
 * @LastEditors: Steven
 * @LastEditTime: 2020-08-04 09:57:41
 */
Component({
  mixins: [],
  data: {
  },
  props: {
    client: "",
  },
  didMount() {
  },
  didUpdate() {
  },
  didUnmount() {
  },
  methods: {
    handleTap() {
      my.navigateTo({
        url: "/pages/checkin/customer/customer",
      })
    },
  },
})
