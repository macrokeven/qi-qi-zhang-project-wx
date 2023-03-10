Component({
  options:{
    addGlobalClass:true
  },
  data: {
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
  },
  methods: {
    switchTab(e) {

      const data = e.currentTarget.dataset
      const url = data.path
      //注意，此处使用setData去改变selected会出现问题。应该在对应页面中进行设置

      // this.setData({
      //   selected: data.index
      // })
      wx.switchTab({ url })

    }
  }
})