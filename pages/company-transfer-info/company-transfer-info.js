// pages/company-transfer-info/company-transfer-info.js
import {data as NewTransferData} from "../../data/NewTransferData";

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
        taxStatusMap: NewTransferData.taxStatusMap,
        taxLevelMap: NewTransferData.taxLevelMap,
        companyStatusMap: NewTransferData.companyStatusMap,
        companyIndustryMap: NewTransferData.companyIndustryMap,
        tTypeMap: NewTransferData.tTypeMap,
        companyChangeMap: NewTransferData.companyChangeMap,
        companyTypeMap: NewTransferData.companyTypeMap,
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