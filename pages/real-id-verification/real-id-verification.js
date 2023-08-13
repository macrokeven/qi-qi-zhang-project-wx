// pages/real-id-verification/real-id-verification.js
import Message from 'tdesign-miniprogram/message/index';
import {API as $api} from "../../utils/MyRequest";

Page({
    /**
     * 页面的初始数据
     */
    data: {
        uploadIDCardF: "",
        uploadIDCardB: ""
    },
    uploadPhoto(e) {
        let that = this;
        let type = e.currentTarget.dataset.type;
        let uploadUrl = "http://localhost:8001/FileUpload/" + (type === '1' ? 'UploadUserIdCardPictureFront' : 'UploadUserIdCardPictureBack');
        console.log(uploadUrl)
        wx.chooseMedia({
            count: 1,
            mediaType: ['image'],
            sourceType: ['album', 'camera'],
            camera: 'back',
            success(res) {
                if (res.tempFiles.size > 4 * 1000 * 1000) {
                    Message.warning({
                        context: that,
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
                        url: uploadUrl, //仅为示例，非真实的接口地址
                        filePath: res.tempFiles[0].tempFilePath,
                        name: 'multipartFile',
                        formData: {
                            'user': 'test'
                        },
                        success(res) {
                            let picUrl = JSON.parse(res.data).data;
                            Message.success({
                                context: that,
                                offset: [20, 32],
                                marquee: {loop: 0},
                                duration: 5000,
                                content: '上传成功!',
                            })
                            if(type === '1'){
                                that.setData({
                                    uploadIDCardF:picUrl
                                })
                            }else{
                                that.setData({
                                    uploadIDCardB:picUrl
                                })
                            }
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
    getData() {
        $api.authRequest(
            "POST",
            `IdCardVerifyInfo/GetIdCardVerifyInfoByUid`,
            {}
        ).then(res => {
            this.setData({
                uploadIDCardF:res.data.idCardFUrl,
                uploadIDCardB:res.data.idCardBUrl,
            })
            if(res.data.status ===3){
                Message.success({
                    context: this,
                    offset: [20, 32],
                    marquee: {loop: 0},
                    duration: 2000,
                    content: '已经实名！'
                })
                setTimeout(()=>{
                    wx.navigateBack();
                },500)
            }
        });
    },
    submitData() {
        $api.authRequest(
            "POST",
            `IdCardVerifyInfo/SubmitIdCardVerifyByUid`,
            {}
        ).then(res => {
            if(res.status === 0){
                Message.success({
                    context: this,
                    offset: [20, 32],
                    marquee: {loop: 0},
                    duration: 2000,
                    content: '提交成功！'
                });
                setTimeout(()=>{
                    wx.navigateBack();
                },500)
            }else{
                Message.warning({
                    context: this,
                    offset: [20, 32],
                    marquee: {loop: 0},
                    duration: 2000,
                    content: '网络异常，稍后再试！1000023'
                })
            }

        });
    },
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