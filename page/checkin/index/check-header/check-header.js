Component({
  mixins: [],
  data: {},
  props: {},
  didMount() {
    const date = new Date();
    const today = `${date.getFullYear()}年${date.getMonth() +
      1}月${date.getDate()}日`;
    this.setData({
      today
    });
  },
  didUpdate() {},
  didUnmount() {},
  methods: {}
});
