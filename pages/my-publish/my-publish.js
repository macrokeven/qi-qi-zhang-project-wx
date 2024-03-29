// pages/company-transfer/company-transfer.js
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
    getData() {
        $api.authRequest(
            "POST",
            `CompanyTransferInfo/GetCompanyTransferInfosByUid`,
            {}
        ).then(res => {
            if (res.status === 0) {
                this.setData({
                    dataList: this.formatData(res.data)
                });
            }
        });
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
    openPublishInfo(e) {
        if (!getApp().globalData.userInfo.login) {
            wx.navigateTo({
                url: "/pages/login/login"
            })
        } else {
            wx.navigateTo({
                url: "/pages/my-publish-info/my-publish-info?tId=" + e.currentTarget.dataset.tId,
            });
        }
    },
    /**
     * 页面的初始数据
     */
    data: {
        currentPopup: "",
        establishYearPopup: false,
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
        taxStatusMap: {
            0: "税务情况",
            1: "零申报",
            2: "有开票无纳税",
            3: "有开票有纳税",
            4: "有开票后期零申报",
        },
        taxLevelMap: {
            0: "无",
            1: "A级",
            2: "B级",
            3: "C级",
            4: "D级",
            5: "M级"
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
        companyIndustryMap: {
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
            1000018: "其他",
            1000019: "文化传媒",
            1000020: "教育咨询",
            1000021: "建筑工程",
            1000022: "教育科技",
            1000023: "电子商务",
            1000024: "实业",
            1000025: "金属",
            1000026: "装饰工程",
        },
        tTypeMap: {
            1: "个体户",
            2: "公司"
        },
        companyChangeMap: {
            1: '包含变更',
            2: '不包含变更'
        },
        companyTypeMap: {
            1: '内资',
            2: '外资'
        },

        dataList:null,
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

        companyStatusValueMap: {}
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
                taxStatusList: this.data.taxStatus === 0 ? [] : [this.data.taxStatus],
                companyStatusList: this.getChosenValueFromMap(this.data.companyStatusValueMap),
                companyTypeList: this.data.companyType === 0 ? [] : [this.data.companyType],
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