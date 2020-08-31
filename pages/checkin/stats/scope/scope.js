import moment from "moment"

Component({
  mixins: [],
  data: {
    today: "2020-04-01",
    control: [{}],
    userNum: 0,
  },
  props: {
    dept: "",
    onGetNewDate: (day) => console.log(day),
    onGetNewDept: (dept) => console.log(dept),
    onGetNewUser: (users) => console.log(users),
    onToHistory: () => {
    },
  },
  didMount() {
    this.setData({
      today: moment().format("YYYY-MM-DD"),
    })
  },
  didUpdate() {
  },
  didUnmount() {
  },
  methods: {
    chooseDate() {
      my.datePicker({
        format: "yyyy-MM-dd",
        currentDate: this.data.today,
        success: (res) => {
          this.props.onGetNewDate(res.date)
          this.setData({
            today: res.date,
          })
        },
      })
    },
    choosePerson() {
      my.complexChoose({
        title: "选择查看对象", //标题
        multiple: true, //是否多选
        limitTips: "超出了", //超过限定人数返回提示
        maxUsers: 1000, //最大可选人数
        pickedUsers: [], //已选用户
        pickedDepartments: [], //已选部门
        disabledUsers: [], //不可选用户
        disabledDepartments: [], //不可选部门
        requiredUsers: [], //必选用户（不可取消选中状态）
        requiredDepartments: [], //必选部门（不可取消选中状态）
        permissionType: "xxx", //可添加权限校验，选人权限，目前只有GLOBAL这个参数
        responseUserOnly: true, //返回人，或者返回人和部门
        success: (res) => {
          console.log("选人结束", res)
          this.setData({
            userNum: res.selectedCount,
          })
          this.props.onGetNewUser(res.users)

        },
        fail: (err) => {
        },
      })
    },
    goToHistory() {
      this.props.onToHistory()
    },
  },
})
