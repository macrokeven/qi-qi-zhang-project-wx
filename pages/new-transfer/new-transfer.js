// pages/new-transfer/new-transfer.js
import Message from 'tdesign-miniprogram/message/index';

const {API: $api} = require("../../utils/MyRequest");
const areaList = require("./../../data/AreaData").areaList;
const getOptions = (obj, filter) => {
    const res = Object.keys(obj).map((key) => ({value: key, label: obj[key]}));
    if (filter) {
        return res.filter(filter);
    }
    return res;
};

const match = (v1, v2, size) => v1.toString().slice(0, size) === v2.toString().slice(0, size);

Page({
    getCities(provinceValue) {
        const cities = getOptions(areaList.cities, (city) => match(city.value, provinceValue, 2));
        const counties = this.getCounties(cities[0].value);

        return {cities, counties};
    },
    getCounties(cityValue) {
        return getOptions(areaList.counties, (county) => match(county.value, cityValue, 4));
    },
    onPickerChange(e) {
        const {value, label} = e.detail;
        this.setData({
            areaVisible: false,
            companyArea: value[2],
            areaText: label[2],
            areaValue: value
        });
    },
    onPickerCancel(e) {
        this.setData({
            areaVisible: false,
        });
    },
    onAreaPicker() {
        this.setData({areaVisible: true});
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
        let initObj = this.data.currentObj.options[0]
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
    },
    showDatePicker() {
        this.setData({
            dateVisible: true,
        });
    },
    hidePicker() {
        this.setData({
            dateVisible: false,
        });
    },
    onConfirm(e) {
        const {value} = e.detail;
        this.setData({
            establishDate: value,
        });
        this.hidePicker();
    },
    submitNewTransfer() {
        $api.authRequest(
            "POST",
            "CompanyTransferInfo/InsertNewCompanyTransferInfoByCompanyTransferInfo",
            {
                companyName: this.data.companyName,
                companyIndustry: this.data.companyIndustry.value,
                companyArea: this.data.companyArea,
                establishDate: this.data.establishDate,
                taxStatus: this.data.taxStatus.value,
                taxLevel: this.data.taxLevel.value,
                licenses: this.data.licenses,
                companyStatus: this.data.companyStatus.value,
                transferPrice: this.data.transferPrice,
                companyChangeStatus: this.data.companyChange.value,
                faceNegate: false,
                sellerName: this.data.sellerName,
                sellerPhone: this.data.sellerPhone,
                comment: this.data.comment,
                companyType: this.data.companyType.value,
            }
        ).then(res => {
            if (res.status === 0) {
                Message.success({
                    context: this,
                    offset: [20, 32],
                    marquee: {loop: 0},
                    duration: 5000,
                    content: ' 发布成功!',
                })
                wx.navigateTo({
                    url: "/pages/company-transfer-detail/company-transfer-detail"
                })
            }
        })
    },
    onUserInput(e) {
        this.setData({
            [`${e.target.dataset.name}`]: e.detail.value,
        });
    },

    /**
     * 页面的初始数据
     */
    data: {
        dateVisible: false,
        date: new Date().getTime(), // 支持时间戳传入
        start: '2000-01-01 00:00:00',
        end: '2030-09-09 12:12:12',
        establishDate: "",
        currentObj: {
            options: [],
            value: 0,
            visible: false,
        },
        currentName: "",
        companyIndustry: {
            visible: false,
            label: "",
            value: 0,
            options: [
                {
                    value: 1000001,
                    label: '综合类',
                },
                {
                    value: 1000002,
                    label: '环保类',
                },
                {
                    value: 1000003,
                    label: '供应链',
                },
                {
                    value: 1000004,
                    label: '金融类',
                },
                {
                    value: 1000005,
                    label: '房产类',
                },
                {
                    value: 1000006,
                    label: '人才类',
                },
                {
                    value: 1000007,
                    label: '代理类',
                },
                {
                    value: 1000008,
                    label: '物流类',
                },
                {
                    value: 1000009,
                    label: '贸易类',
                },
                {
                    value: 1000010,
                    label: '投资类',
                },
                {
                    value: 1000011,
                    label: '科技类',
                },
                {
                    value: 1000012,
                    label: '产品类',
                },
                {
                    value: 1000013,
                    label: '管理类',
                },
                {
                    value: 1000014,
                    label: '服务类',
                },
                {
                    value: 1000015,
                    label: '设计/企划类',
                },
                {
                    value: 1000016,
                    label: '材料类',
                },
                {
                    value: 1000017,
                    label: '工程类',
                },

            ]
        },
        taxStatus: {
            visible: false,
            label: "",
            value: 0,
            options: [
                {
                    value: 1,
                    label: '零申报',
                },
                {
                    value: 2,
                    label: '有开票无纳税',
                },
                {
                    value: 3,
                    label: '有开票有纳税',
                },
                {
                    value: 4,
                    label: '有开票后期零申报',
                },
            ],
        },
        taxLevel: {
            visible: false,
            label: "",
            value: 0,
            options: [
                {
                    value: 1,
                    label: 'A',
                },
                {
                    value: 2,
                    label: 'B',
                },
                {
                    value: 3,
                    label: 'C',
                },
                {
                    value: 4,
                    label: 'D',
                },
                {
                    value: 5,
                    label: 'M',
                },
            ],
        },
        establishYear: {
            visible: false,
            label: "",
            value: 0,
            options: [
                {
                    value: 1,
                    label: '1年',
                },
                {
                    value: 2,
                    label: '2年',
                },
                {
                    value: 3,
                    label: '3年',
                },
                {
                    value: 4,
                    label: '4年',
                },
                {
                    value: '5',
                    label: '5年及以上',
                },
            ],
        },
        companyStatus: {
            visible: false,
            label: "",
            value: 0,
            options: [
                {
                    value: 1,
                    label: '无',
                },
                {
                    value: 2,
                    label: '已税务登记',
                },
                {
                    value: 3,
                    label: '已开户',
                },
                {
                    value: 4,
                    label: '已刻章',
                },
            ],
        },
        companyType: {
            visible: false,
            label: "",
            value: 0,
            options: [
                {
                    value: 1,
                    label: '内资',
                },
                {
                    value: 2,
                    label: '外资',
                },
            ],
        },
        companyChange: {
            visible: false,
            label: "",
            value: 0,
            options: [
                {
                    value: 1,
                    label: '包含',
                },
                {
                    value: 2,
                    label: '不包含',
                },
            ],
        },
        faceNegate: {
            visible: false,
            label: "",
            value: 0,
            options: [

                {
                    value: true,
                    label: '是',
                },
                {
                    value: false,
                    label: '否',
                },
            ],
        },
        companyName: "",
        companyArea: 0,
        licenses: "",
        transferPrice: "",
        sellerName: "",
        sellerPhone: "",
        comment: "",
        provinces: getOptions(areaList.provinces),
        cities: [],
        counties: [],
        areaVisible: false,
        areaCode: 0,
        areaValue: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            currentObj: this.data.taxStatus
        })
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
        const {provinces} = this.data;
        console.log(provinces)
        const {cities, counties} = this.getCities(provinces[0].value);
        this.setData({cities, counties: areaList.counties});
    },
    onColumnChange(e) {
        console.log('pick:', e.detail);
        const {column, index} = e.detail;
        const {provinces, cities} = this.data;

        if (column === 0) {
            // 更改省份
            const {cities, counties} = this.getCities(provinces[index].value);

            this.setData({cities, counties});
        }

        if (column === 1) {
            // 更改城市
            const counties = this.getCounties(cities[index].value);

            this.setData({counties});
        }

        if (column === 2) {
            // 更改区县
        }
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