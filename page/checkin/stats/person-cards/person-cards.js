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
      this.props.onLower();
    },
    goToPorfile(e) {
      const item = e.currentTarget.dataset.item;
      my.navigateTo({
        url: `/page/checkin/profile/profile?userid=${item.jobNumber}&username=${item.userName}`,
      });
    },
    previewImg(e) {
      my.previewImage({
        urls: [e.currentTarget.dataset.src],
      });
    },
  },
});
