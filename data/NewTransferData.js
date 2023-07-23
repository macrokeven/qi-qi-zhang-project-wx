let data = {
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
            {
                value: 1000018,
                label: '其他',
            },
            {
                value: 1000019,
                label: '文化传媒',
            },

            {
                value: 1000020,
                label: '教育咨询',
            },
            {
                value: 1000021,
                label: '建筑工程',
            },
            {
                value: 1000022,
                label: '教育科技',
            },
            {
                value: 1000023,
                label: '电子商务',
            },
            {
                value: 1000024,
                label: '实业',
            },
            {
                value: 1000025,
                label: '金属',
            },
            {
                value: 1000026,
                label: '装饰工程',
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
        ],
    },
    tType: {
        visible: false,
        label: "",
        value: 0,
        options: [
            {
                value: 2,
                label: '公司',
            },
            {
                value: 1,
                label: '个体户',
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
                label: '已税务登记',
            },
            {
                value: 2,
                label: '已开户',
            },
            {
                value: 3,
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
                value: 1,
                label: '是',
            },
            {
                value: 2,
                label: '否',
            },
        ],
    },
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
}

module.exports = {
    data
}