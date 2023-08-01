// pages/knowledge-wiki.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wikiData: null,
    openStatus: {}
  },

  toggleContentShow(ev){
    const {key, item} = ev.currentTarget.dataset;
    if(!item.content) return;
    const status = !this.data.openStatus[key];
    this.setData({
      openStatus: {
        ...this.data.openStatus,
        [key]: status
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // emulate
    this.setData({
      wikiData: [
        {
          title: "销售货物 3%",
          content: "这是一个wiki\n你可以在这里获取更多信息"
        },
        {
          title: "你好鸭"
        }
      ]
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})