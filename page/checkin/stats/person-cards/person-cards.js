Component({
  mixins: [],
  data: {},
  props: {
    items: [
      // {
      //   name: "陈士明",
      //   lastTime: "08:58",
      //   checkInTimes: 3,
      //   remark: "test1",
      //   address: "宁波市公安局北仑分局交通警察大队",
      //   picUrl: "/assets/images/fake1.jpg"
      // },
      // {
      //   name: "李丽",
      //   lastTime: "09:58",
      //   checkInTimes: 4,
      //   address: "宁波市公安局北仑分局交通警察大队",
      // },
      // {
      //   name: "邬顶立",
      //   lastTime: "10:58",
      //   checkInTimes: 1,
      //   address: "宁波市公安局北仑分局交通警察大队",
      // },
      // {
      //   thumbAvatar:"/assets/images/pan_avatar.jpg",
      //   name: "潘燕燕",
      //   lastTime: "09:53",
      //   checkInTimes: 1,
      //   address: "宁波市公安局北仑分局交通警察大队",
      // }
    ],
    activeIndex:1,
  },
  didMount() {
    console.log(this.props.activeIndex)
  },
  didUpdate() {
    console.log(this.props.activeIndex)
  },
  didUnmount() {},
  methods: {}
});
