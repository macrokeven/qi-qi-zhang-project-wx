// pages/tax-cal/tax-cal.js

const toFixed2 = v=>((v*100)|0)/100;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        inputPrice: 0,
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
        peopleType:{
            value: 0,
            options: [
                {
                    value: 0,
                    label: '小规模纳税人',
                },
                {
                    value: 1,
                    label: '一般纳税人',
                },
            ],
        },
        taxValue:{
            value: 3,
            options: [
                {
                    value: 0,
                    label: '0%',
                },
                {
                    value: 1,
                    label: '1%',
                },
                {
                    value: 2,
                    label: '2%',
                },
                {
                    value: 3,
                    label: '3%',
                },
                {
                    value: 4,
                    label: '4%',
                },
                {
                    value: 5,
                    label: '5%',
                },
                {
                    value: 6,
                    label: '6%',
                },
                {
                    value: 7,
                    label: '7%',
                },
                {
                    value: 8,
                    label: '8%',
                },
                {
                    value: 9,
                    label: '9%',
                },
                {
                    value: 10,
                    label: '10%',
                },
                {
                    value: 11,
                    label: '11%',
                },
                {
                    value: 12,
                    label: '12%',
                },
                {
                    value: 13,
                    label: '13%',
                },
                {
                    value: 14,
                    label: '14%',
                },
                {
                    value: 15,
                    label: '15%',
                },
                {
                    value: 16,
                    label: '16%',
                },
                {
                    value: 17,
                    label: '17%',
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
        finalSale: 0,
        finalTax: 0
    },
    calcTaxFromInput(e){
        this.data.inputPrice = e.detail.value;
        this.calcTax();
    },
    calcTax(){
        const inputPrice = parseFloat(this.data.inputPrice);
        const taxRate = this.data.taxValue.value/100;
        const remains = inputPrice / (1+taxRate);
        const tax = inputPrice - remains;
        this.setData({
            finalSale: toFixed2(remains),
            finalTax: toFixed2(tax)
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },
    openPicker(e) {
        let obj = {}
        let picker = e.target.dataset.picker;
        obj = {currentObj: this.data[picker]};
        obj[picker] = this.data[picker];
        obj.currentObj.visible = true;
        obj[picker].visible = true;
        obj['currentName'] = picker;
        this.setData(obj);
    },
    onPick(e) {
        let obj = this.data.currentObj;
        obj.value = e.detail.value[0];
        obj.label = e.detail.label[0];
        this.setData({
            currentObj: obj
        })
    },
    onPickerConfirm(e) {
        let obj = this.data.currentObj;
        obj.visible = false;
        if (this.data.currentObj.value === 0) {
            let initObj = this.data.currentObj.options[0]
            obj.value = initObj.value;
            obj.label = initObj.label;
        }
        let result = {}
        result[this.data.currentName] = obj;
        result["currentObj"] = obj;
        this.setData(result);
        this.calcTax();
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