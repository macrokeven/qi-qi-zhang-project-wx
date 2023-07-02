// pages/tax-cal/tax-cal.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        product: {
            value: 'all',
            options: [
                {
                    value: 'all',
                    label: '全部产品',
                },
                {
                    value: 'new',
                    label: '最新产品',
                },
                {
                    value: 'hot',
                    label: '最火产品',
                },
            ],
        },
        // sorter: {
        //     value: 'default',
        //     options: [
        //         {
        //             value: 'default',
        //             label: '默认排序',
        //         },
        //         {
        //             value: 'price',
        //             label: '价格从高到低',
        //         },
        //     ],
        // },

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },
    methods: {
        handleMultipleSelect(e) {
            this.setData({
                'multipleSelect.value': e.detail.value,
            });
        },
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