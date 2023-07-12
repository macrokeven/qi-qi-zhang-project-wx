// pages/login/login.js
import Message from 'tdesign-miniprogram/message/index';

const {API: $api} = require("../../utils/MyRequest");
Page({
    getActiveCode() {
        let that = this;
        if (that.data.phoneNumber !== "") {
            if (this.data.loginStatus !== 1) {
                $api.authRequest(
                    "POST",
                    "ActiveCode/GetLoginPhoneNumberActiveCodeByPhoneNumber",
                    {phoneNumber: that.data.phoneNumber}
                ).then(res => {
                    if (res.status === 0) {
                        Message.success({
                            context: this,
                            offset: [20, 32],
                            marquee: {loop: 0},
                            duration: 5000,
                            content: ' 发送成功!',
                        })

                        this.setData({
                            loginStatus: 1
                        })
                        let activeCodeTimer = setInterval(function () {
                            if (that.data.requestWaitingTime > 0) {
                                that.setData({
                                    requestWaitingTime: that.data.requestWaitingTime - 1
                                })
                            } else {
                                that.setData({
                                    requestWaitingTime: 60,
                                    loginStatus: 0
                                })
                                clearInterval(activeCodeTimer);
                            }
                        }, 1000);
                    } else {
                        Message.error({
                            context: this,
                            offset: [20, 32],
                            marquee: {loop: 0},
                            duration: 5000,
                            content: "激活码错误或失效",
                        })
                    }
                })

            }
        } else {
            Message.warning({
                context: this,
                offset: [20, 32],
                marquee: {loop: 0},
                duration: 5000,
                content: '手机号格式不正确！'
            })
        }
    },
    getPhoneNumber(e) {
        if (e.detail.errMsg === "getPhoneNumber:ok") {
            $api.authRequest(
                "POST",
                "WeChatApi/LoginByWeChatPhoneCode",
                {code: e.detail.code}
            ).then(res => {
                if (res.status === 0) {
                    getApp().globalData.userInfo = res.data;
                    getApp().globalData.userInfo.login = true;
                    Message.success({
                        context: this,
                        offset: [20, 32],
                        marquee: {loop: 0},
                        duration: 5000,
                        content: '登录成功!',
                    })
                    setTimeout(() => {
                        wx.switchTab({
                            url: "/pages/home/home"
                        });
                    }, 500)
                }
            })
        } else {
            this.setData({
                loginMethod: 1
            })
        }
    },
    login() {
        let that = this;
        $api.authRequest(
            "POST",
            "MyLogin/PhoneNumberActiveCode",
            {
                loginMethod: "phone_code",
                phoneNumber: that.data.phoneNumber,
                activeCode: that.data.activeCode
            }
        ).then(res => {
            if (res.status === 0) {
                getApp().globalData.userInfo = res.data;
                getApp().globalData.userInfo.login = true;
                Message.success({
                    context: this,
                    offset: [20, 32],
                    marquee: {loop: 0},
                    duration: 5000,
                    content: '登录成功!',
                })
                setTimeout(() => {
                    wx.switchTab({
                        url: "/pages/home/home"
                    });
                }, 500)
            }
            console.log(getApp().globalData.userInfo)
        })
    },
    getInputPhoneNumber(e) {
        this.setData({
            phoneNumber: e.detail.value
        })
    },
    getInputActiveCode(e) {
        this.setData({
            activeCode: e.detail.value
        })
    },
    /**
     * 页面的初始数据
     */
    data: {
        phoneNumber: "",
        activeCode: "",
        requestWaitingTime: 60,
        loginStatus: 0,
        loginMethod: 0,
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