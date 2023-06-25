// pages/company-transfer/company-transfer.js
const {API: $api} = require("../../utils/MyRequest");
const areaList = require("./../../data/AreaData").areaList;
const getOptions = (obj, filter) => {
    console.log(areaList)
    const res = Object.keys(obj).map((key) => ({value: key, label: obj[key]}));
    if (filter) {
        return res.filter(filter);
    }
    return res;
};

const match = (v1, v2, size) => v1.toString().slice(0, size) === v2.toString().slice(0, size);

Page({
    openPickerBox() {
        this.setData({
            cityVisible: true
        })
    },
    moneyFormat(num) {
        num = String(num)
        const len = num.length
        return len <= 3 ? num : this.moneyFormat(num.substr(0, len - 3)) + ',' + num.substr(len - 3, 3)
    },
    getData() {
        $api.authRequest(
            "POST",
            "CompanyTransferInfo/GetAllCompanyTransferInfos",
            {}
        ).then(res => {
            if (res.status === 0) {
                this.setData({
                    dataList: this.formatData(res.data)
                })
            }
        })
    },
    formatData(dataList) {
        dataList.forEach((item) => {
            console.log(item)
            item.establishDate = this.data.year - item.establishDate.split(" ")[0].split("-")[0];

        })
        return dataList;
    },
    openNewTransfer() {
        wx.navigateTo({
            url: "/pages/new-transfer/new-transfer"
        })
    },
    openPopup(e) {
        this.setData({
            currentPopup: e.target.dataset.name,
            [`${e.target.dataset.name}` + 'Popup']: true,
        });
    },
    onVisibleChange(e) {
        this.setData({
            [`${this.data.currentPopup}` + 'Popup']: e.detail.visible,
        });
    },
    onAreaClose(e) {
        this.setData({
            areaVisible: false
        })
    },
    chooseSingleItem(e) {
        this.setData({
            [`${e.target.dataset.name}`]: e.target.dataset.value,
        });

    },
    closeOtherPopup() {
        this.setData({
            otherPopup: false
        })
    },
    /**
     * 页面的初始数据
     */
    data: {
        currentPopup: "",
        taxStatusPopup: false,
        taxLevelPopup: false,
        establishYearPopup: false,
        otherPopup: false,
        currentChoice: 0,
        companyStatus: 0,
        year: "",
        month: "",
        day: "",
        taxStatus: 0,
        taxLevel: 0,
        establishYear: 0,
        price: 0,
        companyType: 0,
        hasLicenses: null,
        pickerItem: [
            {
                title: "请选择税务情况",
                options: [
                    {label: '零申报', value: 1},
                    {label: '有开票', value: 2},
                    {label: '有交税', value: 3},
                ],
                value: []
            },

        ],
        cityVisible: false,
        cityText: '',
        cityValue: [],
        dateText: '',
        dateValue: [],
        taxStatusMap: {
            0: "税务情况",
            1: "零申报",
            2: "有开票无纳税",
            3: "有开票有纳税",
            4: "有开票后期零申报",
        },
        taxLevelMap: {
            0: "税务等级",
            1: "税务等级A",
            2: "税务等级B",
            3: "税务等级C",
            4: "税务等级D",
            5: "税务等级M"
        },
        priceMap: {
            0: "价格区间",
            1: "1万-2万",
            2: "2万-3万",
            3: "3万-4万",
            4: "5万-7万",
            5: "7万及以上"
        },
        establishYearMap: {
            0: "成立年限",
            1: "1年以下",
            2: "1-2年",
            3: "3-5年",
            4: "5年以上",
        },
        companyStatusMap: {
            1: "无",
            2: "已税务登记",
            3: "已开户",
            4: "已刻章",
        },
        seasons: [
            {label: '春', value: '春'},
            {label: '夏', value: '夏'},
            {label: '秋', value: '秋'},
            {label: '冬', value: '冬'},
        ],
        dataList: [
            {
                companyName: "乐*****有限公司",
                companyIndustry: "科技类",
                transferPrice: 50000,
                faceNegate: false,
                establishDate: 1,
                companyStatus: 3,
                area: "斗门",
                taxStatus: 1

            },
            {
                companyName: "企*****咨询有限公司",
                companyIndustry: "贸易类",
                transferPrice: 300000,
                establishDate: 2,
                faceNegate: false,
                companyStatus: 4,
                area: "斗门",
                taxStatus: 3
            },
            {
                companyName: "企*****咨询有限公司",
                companyIndustry: "贸易类",
                transferPrice: 300000,
                establishDate: 2,
                companyStatus: 4,
                faceNegate: true,
                area: "斗门",
                taxStatus: 3
            },
        ],
        areaText: '',
        areaValue: [0],
        provinces: getOptions(areaList.provinces),
        cities: [],
        counties: [],
        areaVisible: false,
        areaCode: 0,
        companyIndustry:{
            1000001: "综合类",
            1000002: "环保类",
            1000003: "供应链",
            1000004: "金融类",
            1000005: "房产类",
            1000006: "人才类",
            1000007: "代理类",
            1000008: "物流类",
            1000009: "贸易类",
            1000010: "投资类",
            1000011: "科技类",
            1000012: "产品类",
            1000013: "管理类",
            1000014: "服务类",
            1000015: "设计/企划类",
            1000016: "材料类",
            1000017: "工程类",
        }
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

        console.log('picker confirm:', e.detail);
        console.log(value)
        this.setData({
            areaVisible: false,
            areaValue: value[2],
            areaText: label[2],
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


    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.getDate();
        this.getData();
        const {provinces} = this.data;
        console.log(provinces)
        const {cities, counties} = this.getCities(provinces[0].value);
        this.setData({cities, counties: areaList.counties});
    },
    getDate() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        this.setData({
            year,
            month,
            day
        })
        return {
            year,
            month,
            day
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