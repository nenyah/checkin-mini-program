Component({
  mixins: [],
  data: {
    currentIndex: 0
  },
  props: {
    titles: {
      type: Array,
      value: []
    },
    onTabClick: (data) => console.log(data),
  },
  didMount() { },
  didUpdate() { },
  didUnmount() { },
  methods: {
    itemClick(e) {
      // 1.设置最新的index
      this.setData({
        currentIndex: e.currentTarget.dataset.index
      })

      // 2.发出时间
      const data = { index: this.data.currentIndex }
      this.props.onTabClick(data)
      // this.triggerEvent("tabclick", data, {})
    },
    setCurrentIndex(index) {
      console.log(index)
      this.setData({
        currentIndex: index
      })
    }
  },
});
