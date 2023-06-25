// pages/home/home.js
const {API: $api} = require("../../utils/MyRequest");
Page({

    /**
     * Page initial data
     */
    data: {
        avatar: "",
        nickname: "",
        login: "",
        customerBaseInfo: {
            customerName: "",
            representative: "",
            idCardNo: "",
            taxpayerCode: "",
            mobile: ""
        },
        systemNotification: {
            content: ""
        },
        bindCompany: false
    },
    checkLogin() {
        if (!this.data.login) {
            wx.navigateTo({
                url: "/pages/login/login"
            })
        }
    },
    copyTaxpayerCode() {
        wx.setClipboardData({
            data: this.data.customerBaseInfo.customerName +
                " " + this.data.customerBaseInfo.taxpayerCode
        })
    },
    onLoad(options) {

    },
    onReady() {

    },
    onShow() {
        if (typeof this.getTabBar === 'function' &&
            this.getTabBar()) {
            this.getTabBar().setData({
                selected: 0
            })
        }
        this.setData({
            nickname: getApp().globalData.userInfo.nickname,
            avatar: getApp().globalData.userInfo.avatar,
            login: getApp().globalData.userInfo.login
        })
        this.getData();
        this.getNotification();
    },
    getData() {
        $api.authRequest(
            "POST",
            "CustomerBaseInfo/GetUserInfoCustomerBaseInfoVOByUid",
            {}
        ).then(res => {
            if (res.status === 0) {
                if (res.data.customerId !== null && res.data.customerId !== 0) {
                    getApp().globalData.userInfo.bindCompany = true;
                    this.setData({
                        customerBaseInfo: res.data,
                        bindCompany: true
                    })
                    getApp().globalData.userInfo.companyId = res.data.companyId;
                    getApp().globalData.userInfo.taxpayerCode = res.data.taxpayerCode;
                }
            }
        })
    },
    getNotification() {
        $api.authRequest(
            "POST",
            "SystemNotification/GetOpenSystemNotification",
            {}
        ).then(res => {
            if (res.status === 0) {
                this.setData({
                    systemNotification: res.data[0]
                })
            }
        })
    },
    openPage(e) {
        wx.navigateTo({
            url: "/pages/" + e.currentTarget.dataset.path + "/" + e.currentTarget.dataset.path
        })

    },
    switchPage(e) {
        wx.switchTab({
            url: "/pages/" + e.currentTarget.dataset.path + "/" + e.currentTarget.dataset.path
        })

    },

    /**
     * Lifecycle function--Called when page hide
     */
    onHide() {

    },

    /**
     * Lifecycle function--Called when page unload
     */
    onUnload() {

    },

    /**
     * Page event handler function--Called when user drop down
     */
    onPullDownRefresh() {

    },

    /**
     * Called when page reach bottom
     */
    onReachBottom() {

    },

    /**
     * Called when user click on the top right corner to share
     */
    onShareAppMessage() {

    }
})