// pages/company-transfer/company-transfer.js
const {API: $api} = require("../../utils/MyRequest");
const areaList = require("./../../data/AreaData").areaList;
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
        if (!getApp().globalData.userInfo.login) {
            wx.navigateTo({
                url: "/pages/login/login"
            })
        } else {
            wx.navigateTo({
                url: "/pages/company-transfer-info/company-transfer-info?tId=" + e.currentTarget.dataset.tId,
            });
        }

    },
    formatData(dataList) {
        dataList.forEach((item) => {
            console.log(item)
            item.establishDate = this.data.year - item.establishDate.split(" ")[0].split("-")[0];

        })
        return dataList;
    },
    /**
     * 页面的初始数据
     */
    data: {
        currentChoice: 0,
        year: "",
        month: "",
        day: "",
        taxStatus: {
            value: 0,
            options: [
                {
                    value: 0,
                    label: '全部税务情况',
                },
                {
                    value: 1,
                    label: '零申报',
                },
                {
                    value: 2,
                    label: '有开票无纳税',
                },
                {
                    value: 3,
                    label: '有开票有纳税',
                },
                {
                    value: 4,
                    label: '有开票后期零申报',
                },
            ],
        },
        taxLevel: {
            value: 0,
            options: [
                {
                    value: 0,
                    label: '全部公司等级',
                },
                {
                    value: 1,
                    label: 'A',
                },
                {
                    value: 2,
                    label: 'B',
                },
                {
                    value: 3,
                    label: 'C',
                },
                {
                    value: 4,
                    label: 'D',
                },
                {
                    value: 5,
                    label: 'M',
                },
            ],
        },
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
        pickerItem: [
            {
                title: "请选择税务情况",
                options: [
                    {label: '零申报', value: 1},
                    {label: '有开票', value: 2},
                    {label: '有交税', value: 3},
                ],
                value: []
            },

        ],
        cityVisible: false,
        cityText: '',
        cityValue: [],
        dateText: '',
        dateValue: [],
        taxStatusMap: {
            1: "零申报",
            2: "有开票无纳税",
            3: "有开票有纳税",
            4: "有开票后期零申报",
        },
        companyStatusMap: {
            1: "无",
            2: "已税务登记",
            3: "已开户",
            4: "已刻章",
        },
        dataList: [
            {
                companyName: "乐*****有限公司",
                companyIndustry: "科技类",
                transferPrice: 50000,
                faceNegate: false,
                establishDate: 1,
                companyStatus: 3,
                area: "斗门",
                taxStatus: 1

            },
            {
                companyName: "企*****咨询有限公司",
                companyIndustry: "贸易类",
                transferPrice: 300000,
                establishDate: 2,
                faceNegate: false,
                companyStatus: 4,
                area: "斗门",
                taxStatus: 3
            },
            {
                companyName: "企*****咨询有限公司",
                companyIndustry: "贸易类",
                transferPrice: 300000,
                establishDate: 2,
                companyStatus: 4,
                faceNegate: true,
                area: "斗门",
                taxStatus: 3
            },
            {
                companyName: "企*****咨询有限公司",
                companyIndustry: "贸易类",
                transferPrice: 300000,
                establishDate: 2,
                faceNegate: false,
                companyStatus: 4,
                area: "斗门",
                taxStatus: 3
            },
        ],
        companyIndustry: {
            1000001: "综合类",
            1000002: "环保类",
            1000003: "供应链",
            1000004: "金融类",
            1000005: "房产类",
            1000006: "人才类",
            1000007: "代理类",
            1000008: "物流类",
            1000009: "贸易类",
            1000010: "投资类",
            1000011: "科技类",
            1000012: "产品类",
            1000013: "管理类",
            1000014: "服务类",
            1000015: "设计/企划类",
            1000016: "材料类",
            1000017: "工程类",
        },
        counties: []
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
        console.log(this.data.c)
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