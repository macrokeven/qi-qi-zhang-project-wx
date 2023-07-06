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
        if (!getApp().globalData.userInfo.login) {
            wx.navigateTo({
                url: "/pages/login/login"
            })
        } else {
            wx.navigateTo({
                url: "/pages/company-transfer-info/company-transfer-info?tId=" + e.currentTarget.dataset.tId,
            });
        }
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
        companyIndustry: {
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
        },
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
        console.log(this.data)
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