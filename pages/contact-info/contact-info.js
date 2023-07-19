// pages/contact-info/contact-info.js
const {API: $api} = require("../../utils/MyRequest");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dataList: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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
        this.getData();
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },
    getData() {
        $api.authRequest(
            "POST",
            "CompanyTransferPhoneCallRecordInfo/GetCompanyTransferPhoneCallRecordInfosAndCompanyTransferInfosByUid",
            {}
        ).then(res => {
            if (res.status === 0) {
                this.setData({
                    dataList: Object.keys(res.data).length === 0 ? [] : res.data
                })
            }
        })
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