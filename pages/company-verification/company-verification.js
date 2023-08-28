// pages/company-verification/company-verification.js
import Message from 'tdesign-miniprogram/message/index';
import {API as $api} from "../../utils/MyRequest";

Page({
    data: {
        companyLicense: "",
        person: "",
        personIdNum: ""
    },
    uploadPhoto() {
        let that = this;
        let uploadUrl = $api.getUrl() + "FileUpload/UploadEnterpriseLicensePicture";
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
                        url: uploadUrl,
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
                            that.setData({
                                companyLicense: picUrl
                            })
                        },
                        fail(err) {
                            console.log(err);
                        }
                    })
                }
            }
        })
    },
    getData() {
        $api.authRequest(
            "POST",
            `EnterpriseLicenseVerifyInfo/GetEnterpriseLicenseVerifyInfoByUid`,
            {}
        ).then(res => {
            if (res.data !== null && res.data !== undefined) {
                this.setData({
                    companyLicense: res.data.picUrl,
                    person: res.data.person,
                    personIdNum: res.data.personIdNum,
                })
            }

            if (res.data.status === 3) {
                Message.success({
                    context: this,
                    offset: [20, 32],
                    marquee: {loop: 0},
                    duration: 2000,
                    content: '已经实名！'
                })
                setTimeout(() => {
                    wx.navigateBack();
                }, 500)
            }
        });
    },
    submitData() {
        $api.authRequest(
            "POST",
            `EnterpriseLicenseVerifyInfo/SubmitEnterpriseLicenseVerifyByUid`,
            {
                person: this.data.person,
                personIdNum: this.data.personIdNum,
            }
        ).then(res => {
            if (res.status === 0) {
                Message.success({
                    context: this,
                    offset: [20, 32],
                    marquee: {loop: 0},
                    duration: 2000,
                    content: '提交成功！'
                });
                setTimeout(() => {
                    wx.navigateBack();
                }, 500)
            } else {
                Message.warning({
                    context: this,
                    offset: [20, 32],
                    marquee: {loop: 0},
                    duration: 2000,
                    content: res.msg
                })
            }

        });
    },
    onShow() {
        this.getData();
    },
    onUserInput(e) {
        this.setData({
            [`${e.target.dataset.name}`]: e.detail.value,
        });
    },

})