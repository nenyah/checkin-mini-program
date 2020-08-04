/*
 * @Description: 
 * @Author: Steven
 * @Date: 2020-04-09 16:00:28
 * @LastEditors: Steven
 * @LastEditTime: 2020-08-04 09:36:03
 */
Component({
  mixins: [],
  data: {},
  props: {
    signRecords: [],
    notSignRecords: [],
    activeIndex: 1,
    onLower: () => {},
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    lower() {
      this.props.onLower()
    },
    goToPorfile(e) {
      const item = e.currentTarget.dataset.item
      my.navigateTo({
        url: `/pages/checkin/profile/profile?userid=${item.jobNumber}&username=${item.userName}`,
      })
    },
    previewImg(e) {
      my.previewImage({
        urls: [e.currentTarget.dataset.src],
      })
    },
  },
})
