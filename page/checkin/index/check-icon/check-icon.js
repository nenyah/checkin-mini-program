Component({
  mixins: [],
  data: {
    ctime: "00:00"
  },
  props: {},
  didMount() {
    this.getTime();
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    getTime() {
      const date = new Date();
      const ctime = `${date.getHours()}:${date.getMinutes()}`;
      this.setData({
        ctime
      });
    }
  }
});
