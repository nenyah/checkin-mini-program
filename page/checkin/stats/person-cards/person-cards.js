Component({
  mixins: [],
  data: {},
  props: {
    items: [],
    activeIndex: 1,
  },
  didMount() {
  },
  didUpdate() {
  },
  didUnmount() {},
  methods: {
    goToPorfile(e) {
      console.log('跳转我的页面',e);
      const item = e.currentTarget.dataset.item;
      my.navigateTo({
        url: `/page/checkin/profile/profile?userid=${item.jobNumber}&username=${item.userName}`,
      });
    },
    previewImg(e) {
      console.log("预览图片", e);
      my.previewImage({
        urls: [e.currentTarget.dataset.src],
      });
    },
  },
});
