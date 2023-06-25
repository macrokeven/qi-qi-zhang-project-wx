// pages/value-add-tax-info/value-add-tax-info.js
const data1 = require("./../../data/data1")
const data2 = require("./../../data/data2")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        taxInfoA:[],
        taxInfoB:[],
        activeValues: [0],
        isSingleTax:true,
        loadingData:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            taxInfoA:data1.dataList.data,
            taxInfoB:data2.dataList.data
        })
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

    },
    handleChange(e) {
        this.setData({
            activeValues: e.detail.value,
        });
    },
    onChange(e) {
        this.setData({
            isSingleTax: e.detail.value,
            loadingData:true
        });
        setTimeout(()=>{
            this.setData({
                loadingData:false
            });
        },150)
    },
})