import gulpError from './utils/gulpError';

App({
    onShow() {
        wx.loadFontFace({
            family: 'PingFang-SC-Regular',
            source:
                'url("https://letoy-resource-1311015785.cos.ap-nanjing.myqcloud.com/fonts/PingFang-SC-Regular.ttf")',
            success: console.log
        })

        if (gulpError !== 'gulpErrorPlaceHolder') {
            wx.redirectTo({
                url: `/pages/gulp-error/index?gulpError=${gulpError}`,
            });
        }
    },
    globalData: {
        userInfo: {
            login: false,
            phoneNumber: "",
            token: "",
            nickname: "",
            role: 55,
            avatar: "",
            taxpayerCode: "",
            companyId: "",
            bindCompany: false
        },
        isLogin: false,
        requestUrl: "https://letoy.tech/"
    },
    onLaunch(options) {
    }
});
