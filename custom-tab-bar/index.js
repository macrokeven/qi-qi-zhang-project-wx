Component({
  options:{
    addGlobalClass:true
  },
  data: {
    role:55,
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "/pages/home/home",
      iconPath: "/image/icon_component.png",
      selectedIconPath: "/image/icon_component_HL.png",
      text: "首页"
    }, {
      pagePath: "/pages/picker/picker",
      iconPath: "/image/icon_API.png",
      selectedIconPath: "/image/icon_API_HL.png",
      text: "日志"
    }]
  },
  attached() {
    this.setData({
      role:getApp().globalData.userInfo.role
    })
    console.log(getApp().globalData.userInfo.role)
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ url })

    }
  }
})