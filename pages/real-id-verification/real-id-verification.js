// pages/real-id-verification/real-id-verification.js
import Message from 'tdesign-miniprogram/message/index';

Page({

    /**
     * 页面的初始数据
     */
    data: {},
    uploadPhoto() {
        wx.chooseMedia({
            count: 1,
            mediaType: ['image'],
            sourceType: ['album', 'camera'],
            camera: 'back',
            success(res) {
                if (res.tempFiles.size > 4 * 1000 * 1000) {
                    Message.warning({
                        context: this,
                        offset: [20, 32],
                        marquee: {loop: 0},
                        duration: 2000,
                        content: '文件大小超过4MB！'
                    })
                } else {
                    const uploadTask = wx.uploadFile({
                        header: {
                            "Authorization": getApp().globalData.userInfo.token
                        },
                        url: 'http://localhost:8001/FileUpload/UploadPicture', //仅为示例，非真实的接口地址
                        filePath: res.tempFiles[0].tempFilePath,
                        name: 'multipartFile',
                        formData: {
                            'user': 'test'
                        },
                        success(res) {
                            console.log(res);
                        },
                        fail(err) {
                            console.log(err);
                        }
                    })
                }
            }
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