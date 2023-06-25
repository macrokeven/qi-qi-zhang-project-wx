const {API: $api} = require("../../utils/MyRequest");
import Message from 'tdesign-miniprogram/message/index';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        phoneNumber: "",
        editNickname: false,
        nickname: "",
        bindPhoneDialogVisible:false,
        newPhoneDialogVisible:false
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
        this.setData({
            phoneNumber: getApp().globalData.userInfo.phoneNumber,
            nickname: getApp().globalData.userInfo.nickname
        })
    },
    getNickname(e){
        this.setData({
            nickname: e.detail.value
        })
    },
    changeEditNickname() {
        if(!this.data.editNickname){
            this.setData({
                editNickname: true
            })
        }else{
            $api.authRequest(
                "POST",
                "UserInfo/UpdateUserInfoByUsername",
                {
                    username:this.data.nickname
                }
            ).then(res=>{
                if(res.status === 0){
                    this.setData({
                        editNickname: false
                    })
                    Message.success({
                        context: this,
                        offset: [20, 32],
                        marquee: {loop: 0},
duration: 5000,
                        content: '修改成功!',
                    })
                }
            })

        }
    },
    openBindDialog(){
        this.setData({
            bindPhoneDialogVisible: true
        })
    },
    closeDialog(){
        this.setData({
            bindPhoneDialogVisible: false,
            newPhoneDialogVisible: true
        })
    },
    closeNewDialog(){
        this.setData({
            newPhoneDialogVisible: false
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