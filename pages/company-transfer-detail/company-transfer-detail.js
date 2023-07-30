// pages/company-transfer/company-transfer.js
const {API: $api} = require("../../utils/MyRequest");
const areaList = require("./../../data/AreaData").areaList;
const NewTransferData = require("./../../data/NewTransferData").data;
const getOptions = (obj, filter) => {
    const res = Object.keys(obj).map((key) => ({value: key, label: obj[key]}));
    if (filter) {
        return res.filter(filter);
    }
    return res;
};

const match = (v1, v2, size) => v1.toString().slice(0, size) === v2.toString().slice(0, size);

Page({
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
            item.establishDate = this.data.year - item.establishDate.split(" ")[0].split("-")[0];
        })
        return dataList;
    },
    openNewTransfer() {
        if (!getApp().globalData.userInfo.login) {
            wx.navigateTo({
                url: "/pages/login/login"
            })
        } else {
            wx.navigateTo({
                url: "/pages/new-transfer/new-transfer"
            })
        }
    },
    openPopup(e) {
        if (e.currentTarget.dataset.name) {
            this.setData({
                currentPopup: e.currentTarget.dataset.name,
                [`${e.currentTarget.dataset.name}` + 'Popup']: true,
            });
        }

    },
    onVisibleChange(e) {
        if (this.data.currentPopup !== undefined) {
            this.setData({
                [`${this.data.currentPopup}` + 'Popup']: e.detail.visible,
            });
            this.queryByConditions();
        }
    },
    onAreaClose(e) {
        this.setData({
            areaVisible: false
        })
    },
    chooseSingleItem(e) {
        this.setData({
            [`${e.currentTarget.dataset.name}`]: e.currentTarget.dataset.value,
        });
    },
    closeOtherPopup() {
        this.setData({
            otherPopup: false
        })
    },
    openTransferInfo(e) {
        wx.navigateTo({
            url: "/pages/company-transfer-info/company-transfer-info?tId=" + e.currentTarget.dataset.tId,
        });
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
        companyStatus: [],
        year: new Date().getFullYear(),
        taxStatus: 0,
        taxLevel: 0,
        establishYear: 0,
        price: 0,
        companyType: 0,
        hasLicenses: 0,

        cityVisible: false,
        cityText: '',
        cityValue: [],
        dateText: '',
        dateValue: [],
        taxStatusMap: NewTransferData.taxStatusMap,
        taxLevelMap: NewTransferData.taxLevelMap,
        priceMap: NewTransferData.priceMap,
        establishYearMap: NewTransferData.establishYearMap,
        companyStatusMap: NewTransferData.companyStatusMap,
        companyIndustryMap: NewTransferData.companyIndustryMap,
        tTypeMap: NewTransferData.tTypeMap,
        dataList: [],
        areaText: '',
        areaValue: [0],
        provinces: [{"value": "000000", "label": "全部"}, {
            "value": "290000",
            "label": "广东省",
        }, ...getOptions(areaList.provinces).filter((province) =>
            province.value !== "000000" && province.value !== "290000"
        )],
        cities: [],
        counties: [],
        areaVisible: false,
        areaCode: 0,
        minPrice: 0,
        maxPrice: 0,

        companyStatusValueMap: {},

    },
    chooseMultipleItem(e) {
        let oldValueMap = this.data[`${e.currentTarget.dataset.name}` + 'ValueMap'];
        oldValueMap[e.currentTarget.dataset.value] = !oldValueMap[e.currentTarget.dataset.value]
        this.setData({
            [`${e.currentTarget.dataset.name}` + 'ValueMap']: oldValueMap,
        });
    },

    onColumnChange(e) {
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
    getInputValue(e) {
        this.setData({
            [`${e.currentTarget.dataset.name}`]: e.detail.value,
        });
    },
    onPickerChange(e) {
        const {value, label} = e.detail;
        this.setData({
            areaVisible: false,
            areaValue: value,
            areaText: label[1],
        });
        this.queryByConditions();
    },

    onPickerCancel(e) {
        this.setData({
            areaVisible: false,
        });
    },

    onAreaPicker() {
        this.setData({areaVisible: true});
    },
    getChosenValueFromMap(map) {
        return Object.keys(map).filter(key => map[key]);
    },
    queryByConditions() {
        $api.authRequest(
            "POST",
            "CompanyTransferInfo/GetCompanyTransferInfoByConditions",
            {
                minPrice: this.data.minPrice,
                maxPrice: this.data.maxPrice,
                priceStatus: this.data.price,
                taxStatus: this.data.taxStatus === 0 ? [] : [this.data.taxStatus],
                companyStatus: this.getChosenValueFromMap(this.data.companyStatusValueMap),
                companyType: this.data.companyType === 0 ? [] : [this.data.companyType],
                area: this.data.areaValue[1] ? this.data.areaValue[1] : 0,
                establishYear: this.data.establishYear,
                taxLevel: this.data.taxLevel === 0 ? [] : [this.data.taxLevel]
            }
        ).then(res => {
            if (res.status === 0) {
                this.setData({
                    dataList: this.formatData(res.data)
                })
            }
            this.setData({
                otherPopup: false
            })
        });
    },


    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.getData();
        const {provinces} = this.data;
        const {cities, counties} = this.getCities(provinces[0].value);
        this.setData({cities, counties, countryValues: areaList.counties});
    }
})