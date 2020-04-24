Component({
  mixins: [],
  data: {},
  props: {
    items: [],
    activeIndex: 1,
  },
  didMount() {
    console.log(this.props.activeIndex);
  },
  didUpdate() {
    console.log(this.props.activeIndex);
  },
  didUnmount() {},
  methods: {
    goToPorfile(e) {
      console.log(e);
      const item = e.target.dataset.item;
      my.navigateTo({
        url: `/page/checkin/profile/profile?user=${item.workcode}`,
      });
    },
    previewImg(e) {
      console.log("", e);
    },
  },
});
