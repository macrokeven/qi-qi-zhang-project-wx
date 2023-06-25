// pages/company-info/company-info.js
import Message from 'tdesign-miniprogram/message/index';

const {API: $api} = require("../../utils/MyRequest");

Page({

    /**
     * 页面的初始数据
     */
    data: {

        customerName: "",
        representative: "",
        idCardNo: "",
        taxpayerCode: "",
        mobile: ""

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
    getData() {
        $api.authRequest(
            "POST",
            "CustomerBaseInfo/GetUserInfoCustomerBaseInfoVOByUid",
            {}
        ).then(res => {
            if (res.status === 0) {
                this.setData({
                    customerName: res.data.customerName,
                    representative: res.data.representative,
                    idCardNo: res.data.idCardNo,
                    taxpayerCode: res.data.taxpayerCode,
                    mobile: res.data.mobile
                })
            }
        })
    },
    updateData() {
        let that = this;
        $api.authRequest(
            "POST",
            "CustomerBaseInfo/UpdateUserInfoCustomerBaseByUserInfoCustomerBase",
            {
                customerName: this.data.customerName,
                representative: this.data.representative,
                idCardNo: this.data.idCardNo,
                taxpayerCode: this.data.taxpayerCode,
                mobile: this.data.mobile
            }
        ).then(res => {
            if (res.status === 0) {
                Message.success({
                    context: that,
                    offset: [20, 32],
                    marquee: {loop: 0},
                    duration: 5000,
                    content: '修改成功!',
                })
                this.getData();
            }
        })
    },
    getCustomerName(e) {
        this.setData({
            customerName: e.detail.value
        })
    },
    getTaxpayerCode(e) {
        this.setData({
            taxpayerCode: e.detail.value
        })
    },
    getRepresentative(e) {
        this.setData({
            representative: e.detail.value
        })
    },
    getIdCardNo(e) {
        this.setData({
            idCardNo: e.detail.value
        })
    },
    getMobile(e) {
        this.setData({
            mobile: e.detail.value
        })
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