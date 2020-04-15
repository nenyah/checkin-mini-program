Component({
  mixins: [],
  data: {},
  props: {
    tabs: [
      { title: "title1", subTitle: "subtitle1" },
      { title: "title2", subTitle: "subtitle2" },
    ],
    activeTab: 0,
    onTabClick: (data) => console.log(data),
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    itemClick(e) {
      const activeTab = e.currentTarget.dataset.index;
      // 1.设置最新的index
      this.setData({
        activeTab,
      });

      // 2.发出信息
      const data = { index: activeTab };
      this.props.onTabClick(data);
    },
  },
});
