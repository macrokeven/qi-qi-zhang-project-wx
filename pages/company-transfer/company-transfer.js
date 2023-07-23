// pages/company-transfer/company-transfer.js
const {API: $api} = require("../../utils/MyRequest");
const areaList = require("./../../data/AreaData").areaList;
const NewTransferData = require("./../../data/NewTransferData").data;

Page({
    openMoreTransfer() {
        wx.navigateTo({
            url: "/pages/company-transfer-detail/company-transfer-detail"
        })
    },
    openTransfer() {
        if (!getApp().globalData.userInfo.login) {
            wx.navigateTo({
                url: "/pages/login/login"
            })
        } else {
            wx.navigateTo({
                url: "/pages/new-transfer/new-transfer"
            })
        }
    },
    getData() {
        $api.authRequest(
            "POST",
            "CompanyTransferInfo/GetAllCompanyTransferInfos",
            {}
        ).then(res => {
            if (res.status === 0) {
                this.setData({
                    dataList: this.formatData(res.data)
                })
            }
        })
    },
    openTransferInfo(e) {
            wx.navigateTo({
                url: "/pages/company-transfer-info/company-transfer-info?tId=" + e.currentTarget.dataset.tId,
            });
    },
    formatData(dataList) {
        dataList.forEach((item) => {
            item.establishDate = this.data.year - item.establishDate.split(" ")[0].split("-")[0];

        })
        return dataList;
    },
    gotoDetails(){
        wx.navigateTo({
            url: "/pages/company-transfer-detail/company-transfer-detail",
        });
    },
    /**
     * 页面的初始数据
     */
    data: {
        currentChoice: 0,
        year: "",
        month: "",
        day: "",
        taxStatus: NewTransferData.taxStatus,
        taxLevel: NewTransferData.taxLevel,
        establishDate: {
            value: 0,
            options: [
                {
                    value: 0,
                    label: '全部年限',
                },
                {
                    value: 1,
                    label: '1年',
                },
                {
                    value: 2,
                    label: '2年',
                },
                {
                    value: 3,
                    label: '3年',
                },
                {
                    value: 4,
                    label: '4年',
                },
                {
                    value: '5',
                    label: '5年及以上',
                },
            ],
        },
        price: {
            value: 0,
            options: [
                {
                    value: 0,
                    label: '全部价格区间',
                },
                {
                    value: 1,
                    label: '10,000-20,000',
                },
                {
                    value: 2,
                    label: '20,000-30,000',
                },
                {
                    value: 3,
                    label: '30,000-40,000',
                },
                {
                    value: 4,
                    label: '50,000-70,000',
                },
                {
                    value: '5',
                    label: '70,000及以上',
                },
            ],
        },
        cityVisible: false,
        cityText: '',
        cityValue: [],
        dateText: '',
        dateValue: [],
        taxStatusMap: NewTransferData.taxStatusMap,
        companyStatusMap: NewTransferData.companyStatusMap,
        dataList: [],
        companyIndustryMap: NewTransferData.companyIndustryMap,
        counties: [],
        tTypeMap:NewTransferData.tTypeMap,
        taxLevelMap: NewTransferData.taxLevelMap,
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
                selected: 3
            })
        }
        this.setData({
            counties: areaList.counties
        })
        this.getDate();
        this.getData();
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