/* TODO: recommendations
    转让价格 -> 转让价格(元)
*/

// pages/new-transfer/new-transfer.js
import Message from 'tdesign-miniprogram/message/index';

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
const formDataFilters = {
    required: [
        /* 基本信息 */
        'companyName',
        'tType',
        'companyIndustry',
        'companyArea',
        'establishDate',
        /* 税务情况 */
        'taxStatus',
        'companyStatus',
        'companyType',
        /* 转让信息 */
        'faceNegate',
        'transferPrice',
        'companyChangeStatus',
        'sellerName',
        'sellerPhone',
    ]
}

const formItemNames = {
    companyName: '公司全称',
    tType: '企业类型',
    companyIndustry: '公司行业',
    companyArea: '地区',
    establishDate: '成立日期',
    /* 税务情况 */
    taxStatus: '公司税务情况',
    taxLevel: '税务等级',
    licenses: '拥有的许可证',
    companyStatus: '公司情况',
    companyType: '公司类型',
    /* 转让信息 */
    faceNegate: '价格是否面议',
    transferPrice: '转让价格',
    companyChangeStatus: '公司变更',
    /* 联系方式 */
    sellerName: '联系人',
    sellerPhone: '联系电话',
    comment: '备注',
}

/* all of these regexs are global-matching */
/* @return
    true = pass
*/
const formDataFormats = {
    /* 公司全称: 不少于三个字符 */
    companyName: '.{3,}',
    /* 转让价格: 不少于一个数字 */
    transferPrice: '[0-9]+',
    /* 联系人姓名: (目前仅限国人)不少于两个中文字符 */
    sellerName: '[\u4e00-\u9fa5]{2,}',
    /* 手机号: 自定义多项规则 */
    sellerPhone: (v) => {
        const rs = [
            /* Mobile */
            '^[1]{1}(([3]{1}[4-9]{1})|([5]{1}[012789]{1})|([8]{1}[12378]{1})|([4]{1}[7]{1}))[0-9]{8}$',
            /* Union */
            '^[1]{1}(([3]{1}[0-2]{1})|([5]{1}[56]{1})|([8]{1}[56]{1}))[0-9]{8}$',
            /* Telecom */
            '^[1]{1}(([3]{1}[3]{1})|([5]{1}[3]{1})|([8]{1}[09]{1}))[0-9]{8}$'
        ];

        if (v.match('^[0-9]{11}$')) {
            for (let r of rs) if (v.match(r)) return true;
        }
        return false;
    }
}

Page({
    getCities(provinceValue) {
        const cities = getOptions(areaList.cities, (city) => match(city.value, provinceValue, 2));
        const counties = this.getCounties(cities[0].value);
        return {cities, counties};
    },
    getCounties(cityValue) {
        return getOptions(areaList.counties, (county) => match(county.value, cityValue, 4));
    },
    // TODO
    getFormData(filterName = '', toArray = false) {
        let allData = {
            /* 基本信息 */
            companyName: this.data.companyName,
            tType: this.data.tType.value,
            companyIndustry: this.data.companyIndustry.value,
            companyArea: this.data.companyArea,
            establishDate: this.data.establishDate,
            /* 税务情况 */
            taxStatus: this.data.taxStatus.value,
            taxLevel: this.data.taxLevel.value,
            licenses: this.data.licenses,
            companyStatus: this.getMapBooleanValueToString(this.data.companyStatusValueMap),
            companyType: this.data.companyType.value,
            /* 转让信息 */
            faceNegate: this.data.faceNegate.value,
            transferPrice: this.data.transferPrice,
            companyChangeStatus: this.data.companyChange.value,
            /* 联系方式 */
            sellerName: this.data.sellerName,
            sellerPhone: this.data.sellerPhone,
            comment: this.data.comment,
        }

        const filter = formDataFilters[filterName];
        if (filter) {
            // [[k1, v1], [k2, v2], ...]
            if (toArray) return filter.map(k => [k, allData[k]]);
            let newData = {};
            for (let k of filter) newData[k] = allData[k];
            return newData;
        }
        return allData;
    },
    checkForm() {
        let formRequiredDataList = this.getFormData('required', true);
        let formRequiredDataObj = this.getFormData('required');
        /* using DOM to fetch form list may be too tricky */
        // console.log(wx.createSelectorQuery().select('.form-head'))

        /* to filter transferPrice when faceNegate gets true */
        if (formRequiredDataObj.faceNegate) {
            formRequiredDataList = formRequiredDataList.filter(([k]) => k !== 'transferPrice');
            delete formRequiredDataObj.transferPrice;
        }

        /* for readability and portability */

        /* 1: find an empty item */
        let emptyItem = formRequiredDataList.
            /* an empty item (requires defaults to 0) */
            find(([k, v]) => (!v && v !== false) ||
                /* OR a multi-selectable item that selects nothing */
                (v instanceof Array && !v.find(v => v)));
        // console.log('hi', emptyItem, formRequiredDataList.find(([k])=>k=='companyStatus'));
        if (emptyItem) return {
            ok: false,
            type: 'empty',
            itemKey: emptyItem[0],
            itemName: formItemNames[emptyItem[0]]
        }

        /* 2: find an invalid field */
        let invalidItem = Object.entries(formDataFormats).find(([k, regex]) => {
            if (typeof (regex) == 'string') regex = ((regex) => (
                (v) => !!v.match(`^${regex}$`)
            ))(regex);
            if (!formRequiredDataObj[k]) return false;
            return !regex(formRequiredDataObj[k]);
        });
        if (invalidItem) return {
            ok: false,
            type: 'invalid',
            itemKey: invalidItem[0],
            // itemValue: formRequiredDataObj[invalidItem[0]],
            itemName: formItemNames[invalidItem[0]]
        }

        /* 3: pass */
        return {
            ok: true
        };
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
        let result = this.checkForm();
        if (!result.ok) {
            let content = result.type === 'empty' ?
                ` ${result.itemName} 不能为空` :
                ` ${result.itemName} 格式错误`;
            Message.error({
                context: this,
                offset: [20, 32],
                marquee: {loop: 0},
                duration: 5000,
                content,
            });
            return;
        }
        if (!this.data.loading) {
            this.setData({
                loading: true
            });
            $api.authRequest(
                "POST",
                "CompanyTransferInfo/InsertNewCompanyTransferInfoByCompanyTransferInfo",
                this.getFormData('submit')
            ).then(res => {
                if (res.status === 0) {
                    Message.success({
                        context: this,
                        offset: [20, 32],
                        marquee: {loop: 0},
                        duration: 5000,
                        content: ' 发布成功!',
                    })
                    setTimeout(() => {
                        wx.navigateTo({
                            url: "/pages/company-transfer-detail/company-transfer-detail"
                        })
                    }, 500)

                }
                this.setData({
                    loading: false
                })

            })
        }

    },
    getMapBooleanValueToString(map) {
        return Object.keys(map).filter(key => map[key]).join(",");
    },
    onUserInput(e) {
        this.setData({
            [`${e.target.dataset.name}`]: e.detail.value,
        });
    },
    data: {
        loading: false,
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
        companyIndustry: NewTransferData.companyIndustry,
        taxStatus: NewTransferData.taxStatus,
        tType: NewTransferData.tType,
        taxLevel: NewTransferData.taxLevel,
        establishYear: NewTransferData.establishYear,
        companyStatus: NewTransferData.companyStatus,
        companyType: NewTransferData.companyType,
        companyChange: NewTransferData.companyChange,
        faceNegate: NewTransferData.faceNegate,
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
        areaValue: [],
        companyStatusValueMap: [],
        companyStatusMap: {
            1: "税务登记",
            2: "银行开户",
            3: "刻章"
        },
        companyStatusTextValue: "",
        companyStatusVisible: false,
    },
    chooseMultipleItem(e) {
        let oldValueMap = this.data[`${e.currentTarget.dataset.name}` + 'ValueMap'];
        oldValueMap[e.currentTarget.dataset.value] = !oldValueMap[e.currentTarget.dataset.value];
        let text = Object.keys(oldValueMap)
            .filter(key => oldValueMap[key])
            .map(key => this.data[`${e.currentTarget.dataset.name}` + 'Map'][key])
            .join(" ");
        this.setData({
            [`${e.currentTarget.dataset.name}` + 'ValueMap']: oldValueMap,
            [`${e.currentTarget.dataset.name}` + 'TextValue']: text,
        });
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
        const {cities, counties} = this.getCities(provinces[0].value);
        this.setData({cities, counties: areaList.counties});
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
    onVisibleChange(e) {
        let companyStatus = this.data.companyStatus;
        companyStatus.visible = e.detail.visible
        this.setData({
            companyStatus,
        });
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