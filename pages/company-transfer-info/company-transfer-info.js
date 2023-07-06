// pages/company-transfer-info/company-transfer-info.js
const {API: $api} = require("../../utils/MyRequest");
const areaList = require("./../../data/AreaData").areaList;
Page({
    /**
     * 页面的初始数据
     */
    data: {
        companyInfo: {
            companyName: "",
            companyIndustry: "",
            companyArea: "",
            establishDate: "",
            taxStatus: "",
            taxLevel: "",
            licenses: "",
            companyStatus: "",
            transferPrice: "",
            companyChangeStatus: "",
            faceNegate: "",
            sellerName: "",
            sellerPhone: "",
            comment: "",
            companyType: "",
        },
        areaMap: areaList.counties,
        companyIndustryMap: {
            1000001: '综合类',
            1000002: '环保类',
            1000003: '供应链',
            1000004: '金融类',
            1000005: '房产类',
            1000006: '人才类',
            1000007: '代理类',
            1000008: '物流类',
            1000009: '贸易类',
            1000010: '投资类',
            1000011: '科技类',
            1000012: '产品类',
            1000013: '管理类',
            1000014: '服务类',
            1000015: '设计/企划类',
            1000016: '材料类',
            1000017: '工程类'
        },
        taxLevelMap: {
            1: 'A',
            2: 'B',
            3: 'C',
            4: 'D',
            5: 'M'
        },
        companyStatusMap: {
            1: '已税务登记',
            2: '已开户',
            3: '已刻章'
        },
        companyChangeMap: {
            1: '包含变更',
            2: '不包含变更'
        },
        companyTypeMap: {
            1: '内资',
            2: '外资'
        },
        taxStatusMap: {
            1: '零申报',
            2: '有开票无纳税',
            3: '有开票有纳税'
        },
        year: new Date().getFullYear(),
        licenses: '',
        comment: '',
        tId:""
    },
    getData() {
        $api.authRequest(
            "POST",
            "CompanyTransferInfo/GetCompanyTransferInfoByTId",
            {
                tId: this.data.tId
            }
        ).then(res => {
            if (res.status === 0) {
                let licenses = res.licenses;
                let comment = res.comment;
                if (!licenses || licenses === "" || licenses === "无" || licenses === null || licenses === undefined) {
                    licenses = "无";
                }
                if (!comment || comment === "" || comment === "无" || comment === null || comment === undefined) {
                    comment = "无";
                }
                this.setData({
                    companyInfo: res.data,
                    year: new Date().getFullYear() - res.data.establishDate.split("-")[0],
                    licenses,
                    comment,
                })

            }
        })
    },
    callUser: function(e) {
        wx.makePhoneCall({
            phoneNumber: e.currentTarget.dataset.phone
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(options)
        this.setData({
            tId:options.tId
        })
        this.getData();
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