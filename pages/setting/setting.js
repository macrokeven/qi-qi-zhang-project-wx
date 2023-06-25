// pages/setting/setting.js
Page({

    /**
     * Page initial data
     */
    data: {
        login:false,
        nickname: "",
        avatar: "",
        bottomMenuVisible:false
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad(options) {

    },

    /**
     * Lifecycle function--Called when page is initially rendered
     */
    onReady() {

    },

    /**
     * Lifecycle function--Called when page show
     */
    onShow() {
        if (typeof this.getTabBar === 'function' &&
            this.getTabBar()) {
            this.getTabBar().setData({
                selected: 2
            })
        }
        this.setData({
            nickname: getApp().globalData.userInfo.nickname,
            avatar: getApp().globalData.userInfo.avatar,
            login:getApp().globalData.userInfo.login
        })
    },
    checkLogin() {
        if (!getApp().globalData.userInfo.login) {
            wx.navigateTo({
                url: "/pages/login/login"
            })
        }
    },
    openPage(e) {
        this.checkLogin();
        let myData = e.currentTarget.dataset;
        wx.navigateTo({
            url: "/pages/" + myData.route + "/" + myData.route
        })
    },
    onVisibleChange(e) {
        this.setData({
            bottomMenuVisible: e.detail.visible,
        });
    },
    openBottomBar(){
        this.setData({
            bottomMenuVisible: true,
        });
    },

    /**
     * Lifecycle function--Called when page hide
     */
    onHide() {

    },

    /**
     * Lifecycle function--Called when page unload
     */
    onUnload() {

    },

    /**
     * Page event handler function--Called when user drop down
     */
    onPullDownRefresh() {

    },

    /**
     * Called when page reach bottom
     */
    onReachBottom() {

    },

    /**
     * Called when user click on the top right corner to share
     */
    onShareAppMessage() {

    }
})