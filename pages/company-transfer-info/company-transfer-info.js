// pages/company-transfer-info/company-transfer-info.js
const {API: $api} = require("../../utils/MyRequest");
const areaList = require("./../../data/AreaData").areaList;
import Message from 'tdesign-miniprogram/message/index';
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
        companyStatusText: "",
        areaMap: areaList.counties,
        companyIndustryMap: {
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
            1000018: "其他",
            1000019: "文化传媒",
            1000020: "教育咨询",
            1000021: "建筑工程",
            1000022: "教育科技",
            1000023: "电子商务",
            1000024: "实业",
            1000025: "金属",
            1000026: "装饰工程",
        },
        taxLevelMap: {
            0:'无',
            1: 'A级',
            2: 'B级',
            3: 'C级',
            4: 'D级',
            5: 'M级'
        },
        tTypeMap: {
            1: "个体户",
            2: "公司"
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
        tId: ""
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
                let licenses = res.data.licenses;
                let comment = res.data.comment;
                if (!licenses || licenses === "" || licenses === "无" || licenses === null || licenses === undefined) {
                    licenses = "无";
                }
                if (!comment || comment === "" || comment === "无" || comment === null || comment === undefined) {
                    comment = "无";
                }
                let companyStatusText = "";
                res.data.companyStatus.split(",").forEach((item) => {
                    companyStatusText = companyStatusText + " " + this.data.companyStatusMap[item];
                })
                this.setData({
                    companyStatusText,
                    companyInfo: res.data,
                    year: new Date().getFullYear() - res.data.establishDate.split("-")[0],
                    licenses,
                    comment,
                })

            }
            if(res.status === 5){
                Message.warning({
                    context: this,
                    offset: [20, 32],
                    marquee: {loop: 0},
                    duration: 5000,
                    content:"访问太频繁了，休息一下吧",
                });
                setTimeout(() => {
                    wx.navigateBack();
                }, 500)
            }
        })
    },
    callUser: function (e) {
        if (!getApp().globalData.userInfo.login) {
            wx.navigateTo({
                url: "/pages/login/login"
            })
        } else {
            let that = this;
            wx.makePhoneCall({
                phoneNumber: e.currentTarget.dataset.phone,
                success(res) {
                    $api.authRequest(
                        "POST",
                        "CompanyTransferPhoneCallRecordInfo/CreateContactCompanyTransferPhoneCallRecordInfo",
                        {
                            tId: that.data.tId
                        }
                    ).then(r => {
                    })
                },
                fail(res) {
                    $api.authRequest(
                        "POST",
                        "CompanyTransferPhoneCallRecordInfo/CreateCancelCompanyTransferPhoneCallRecordInfo",
                        {
                            tId: that.data.tId
                        }
                    ).then(r => {
                    })
                }
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            tId: options.tId
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