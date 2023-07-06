Component({
  options:{
    addGlobalClass:true
  },
  data: {
    role:55,
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
  },
  attached() {
    this.setData({
      role:getApp().globalData.userInfo.role
    })
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ url })

    }
  }
})