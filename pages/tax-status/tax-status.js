// pages/home/home.js
const {API: $api} = require("../../utils/MyRequest");
Page({
    getData() {
        if(this.data.bindCompany){
            this.setData({
                loadingData: false
            })
            console.log("work")
            const date = this.getDate();
            const period = date.year + "-" + (date.month) + "-" + this.getDay(date.year, date.month - 1);
            $api.authRequest(
                "POST",
                "ThirdPlatform/GetBatchTaxDeclarationInformation",
                {
                    periodYear: date.year,
                    companyId: getApp().globalData.userInfo.companyId,
                    taxCode: getApp().globalData.userInfo.taxpayerCode
                }
            ).then(res => {
                console.log("work1")
                if (res.status === 0) {
                    let data = JSON.parse(res.data);
                    data.forEach((item) => {
                        if (item.period === (date.year + "-" + date.month)) {
                            this.setData({
                                currentMonthTaxInfoData: item.taxList,
                                currentMonthTaxInfoStatus: item.status ? item.status : null
                            });
                        }
                        if (date.month !== 1) {
                            if (item.period === (date.year + "-" + (date.month - 1))) {
                                this.setData({
                                    lastMonthTaxInfoData: item.taxList,
                                    lastMonthTaxInfoStatus: item.status
                                });
                            }
                        } else {
                            this.setData({
                                lastMonthTaxInfoData: []
                            });
                        }
                        console.log("work2")
                    })
                }
                this.setData({
                    loadingData: true
                })
            }).finally(() => {
                this.setData({
                    loadingData: true
                })
            })
        }

    },
    checkBindInfo() {
        $api.authRequest(
            "POST",
            "CustomerBaseInfo/GetUserInfoCustomerBaseInfoVOByUid",
            {}
        ).then(res => {
            if (res.status === 0) {
                if (res.data.customerId !== null && res.data.customerId !== 0) {
                    getApp().globalData.userInfo.bindCompany = true;
                    this.setData({
                        bindCompany:true
                    })
                    getApp().globalData.userInfo.companyId = res.data.companyId;
                    getApp().globalData.userInfo.taxpayerCode = res.data.taxpayerCode;
                }
            }
        })
    },
    // 计算指定年月的天数
    getDay(year, month) {
        return new Date(year, month, 0).getDate()
    },
    getDate() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        this.setData({
            year,
            month,
            day
        })
        return {
            year,
            month,
            day
        }
    },
    /**
     * 页面的初始数据
     */
    data: {
        loadingData: false,
        taxInfoData: [],
        currentMonthTaxInfoData: [],
        lastMonthTaxInfoData: [],
        currentMonthTaxInfoStatus: null,
        lastMonthTaxInfoStatus: null,
        year: "",
        month: "",
        day: "",
        login: getApp().globalData.userInfo.login,
        bindCompany: getApp().globalData.userInfo.bindCompany
    },
    goBindPage() {
        wx.navigateTo({
            url: "/pages/company-info/company-info"
        })
    }, goLogin() {
        wx.navigateTo({
            url: "/pages/login/login"
        })
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
        if (typeof this.getTabBar === 'function' &&
            this.getTabBar()) {
            this.getTabBar().setData({
                selected: 1
            })
        }

        this.checkBindInfo();
        this.setData({
            login: getApp().globalData.userInfo.login,
            bindCompany: getApp().globalData.userInfo.bindCompany
        })
        this.getData();
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