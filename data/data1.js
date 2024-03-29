let json = {
    "type": 1,
    "data": [
        {
            "id": 1,
            "companyType": 1,
            "item": "销售货物",
            "taxRate": "3%"
        },
        {
            "id": 2,
            "companyType": 1,
            "item": "加工、修理修配劳务",
            "taxRate": "3%"
        },
        {
            "id": 3,
            "companyType": 1,
            "item": "销售应税服务、无形资产",
            "taxRate": "3%"
        },
        {
            "id": 4,
            "companyType": 1,
            "item": "销售不动产、经营租赁不动产（土地使用权）",
            "taxRate": "5%"
        },
        {
            "id": 5,
            "companyType": 1,
            "item": "一二级公路、桥闸通行费",
            "taxRate": "5%"
        },
        {
            "id": 6,
            "companyType": 1,
            "item": "选择差额纳税的劳务派遣、安全保护服务）",
            "taxRate": "5%"
        },
        {
            "id": 7,
            "companyType": 1,
            "item": "小规模纳税人销售自己使用过的固定资产和旧货",
            "taxRate": "2%"
        },
        {
            "id": 8,
            "companyType": 2,
            "item": "销售或者进口货物（另有列举的货物除外）",
            "taxRate": "13%"
        },
        {
            "id": 9,
            "companyType": 2,
            "item": "加工、修理修配劳务",
            "taxRate": "13%"
        },
        {
            "id": 10,
            "companyType": 2,
            "item": "有形动产租赁服务",
            "taxRate": "13%"
        },
        {
            "id": 11,
            "companyType": 2,
            "item": "销售或者进口",
            "taxRate": "9%",
            "children": [
                {
                    "id": 12,
                    "companyType": 2,
                    "item": "（1）粮食等农产品、食用植物油、食用盐、鲜奶（生活必需类）",
                    "taxRate": "9%",
                    "pid": 11
                },
                {
                    "id": 13,
                    "companyType": 2,
                    "item": "（2）自来水、暖气、冷气、热水、煤气、石油液化气、天然气、二甲醚、沼气、居民用煤炭制品（生活必需类）",
                    "taxRate": "9%",
                    "pid": 11
                },
                {
                    "id": 14,
                    "companyType": 2,
                    "item": "（3）图书、报纸、杂志、音像制品、电子出版物（文化用品类）",
                    "taxRate": "9%",
                    "pid": 11
                },
                {
                    "id": 15,
                    "companyType": 2,
                    "item": "（4）初级农产品、饲料、化肥、农药、农机、农膜（农业生产资料）",
                    "taxRate": "9%",
                    "pid": 11
                }
            ]
        },
        {
            "id": 16,
            "companyType": 2,
            "item": "交通运输服务",
            "taxRate": "9%"
        },
        {
            "id": 17,
            "companyType": 2,
            "item": "邮政服务",
            "taxRate": "9%"
        },
        {
            "id": 18,
            "companyType": 2,
            "item": "电信服务",
            "taxRate": "9%",
            "children": [
                {
                    "id": 19,
                    "companyType": 2,
                    "item": "（1）基础电信服务",
                    "taxRate": "9%",
                    "pid": 18
                }
            ]
        },
        {
            "id": 20,
            "companyType": 2,
            "item": "建筑服务",
            "taxRate": "9%",
            "children": [
                {
                    "id": 21,
                    "companyType": 2,
                    "item": "（1）工程服务，安装、修缮服务、装饰及其他建筑服务，不含销售建筑材料",
                    "taxRate": "9%",
                    "pid": 20
                }
            ]
        },
        {
            "id": 22,
            "companyType": 2,
            "item": "销售不动产",
            "taxRate": "9%",
            "children": [
                {
                    "id": 23,
                    "companyType": 2,
                    "item": "（1）转让建筑物",
                    "taxRate": "9%",
                    "pid": 22
                }
            ]
        },
        {
            "id": 24,
            "companyType": 2,
            "item": "不动产租赁服务",
            "taxRate": "9%",
            "children": [
                {
                    "id": 25,
                    "companyType": 2,
                    "item": "（1）2016年4月30日前取得不动产，可选用简易计税方法，按照5%的征收率",
                    "taxRate": "9%",
                    "pid": 24
                }
            ]
        },
        {
            "id": 26,
            "companyType": 2,
            "item": "转让土地使用权",
            "taxRate": "9%"
        },
        {
            "id": 27,
            "companyType": 2,
            "item": "金融服务",
            "taxRate": "6%",
            "children": [
                {
                    "id": 28,
                    "companyType": 2,
                    "item": "（1）贷款服务，包括以货币资金投资收取的固定利润和保底利润",
                    "taxRate": "6%",
                    "pid": 27,
                    "children": [
                        {
                            "id": 37,
                            "companyType": 2,
                            "item": "（8）其他现代服务",
                            "taxRate": "6%",
                            "pid": 28,
                            "children": []
                        }
                    ]
                }
            ]
        },
        {
            "id": 29,
            "companyType": 2,
            "item": "现代服务业",
            "taxRate": "6%",
            "children": [
                {
                    "id": 30,
                    "companyType": 2,
                    "item": "（1）研发和技术服务",
                    "taxRate": "6%",
                    "pid": 29
                },
                {
                    "id": 31,
                    "companyType": 2,
                    "item": "（2）信息技术服务，包括软件服务",
                    "taxRate": "6%",
                    "pid": 29
                },
                {
                    "id": 32,
                    "companyType": 2,
                    "item": "（3）文化创意服务，包括设计服务、广告服务、会议展览服务",
                    "taxRate": "6%",
                    "pid": 29
                },
                {
                    "id": 33,
                    "companyType": 2,
                    "item": "（4）物流辅助服务，包括仓储服务、收派服务",
                    "taxRate": "6%",
                    "pid": 29
                },
                {
                    "id": 34,
                    "companyType": 2,
                    "item": "（5）鉴证咨询服务",
                    "taxRate": "6%",
                    "pid": 29
                },
                {
                    "id": 35,
                    "companyType": 2,
                    "item": "（6）广播影视服务",
                    "taxRate": "6%",
                    "pid": 29
                },
                {
                    "id": 36,
                    "companyType": 2,
                    "item": "（7）商务辅助服务，包括经纪代理服务、企业管理服务、人力资源服务",
                    "taxRate": "6%",
                    "pid": 29
                }
            ]
        },
        {
            "id": 38,
            "companyType": 2,
            "item": "生活服务",
            "taxRate": "6%",
            "children": [
                {
                    "id": 39,
                    "companyType": 2,
                    "item": "（1）文化体育服务",
                    "taxRate": "6%",
                    "pid": 38
                },
                {
                    "id": 40,
                    "companyType": 2,
                    "item": "（2）教育医疗服务",
                    "taxRate": "6%",
                    "pid": 38
                },
                {
                    "id": 41,
                    "companyType": 2,
                    "item": "（3）旅游娱乐服务",
                    "taxRate": "6%",
                    "pid": 38
                },
                {
                    "id": 42,
                    "companyType": 2,
                    "item": "（4）餐饮住宿服务",
                    "taxRate": "6%",
                    "pid": 38
                },
                {
                    "id": 43,
                    "companyType": 2,
                    "item": "（5）居民日常服务",
                    "taxRate": "6%",
                    "pid": 38
                },
                {
                    "id": 44,
                    "companyType": 2,
                    "item": "（6）其他生活服务",
                    "taxRate": "6%",
                    "pid": 38
                }
            ]
        },
        {
            "id": 45,
            "companyType": 2,
            "item": "销售无形资产",
            "taxRate": "6%",
            "children": [
                {
                    "id": 46,
                    "companyType": 2,
                    "item": "（1）转让技术、商标、著作权",
                    "taxRate": "6%",
                    "pid": 45
                }
            ]
        },
        {
            "id": 47,
            "companyType": 2,
            "item": "增值电信服务",
            "taxRate": "6%"
        },
        {
            "id": 48,
            "companyType": 2,
            "item": "提供人力资源外包服务",
            "taxRate": "6%",
            "children": [
                {
                    "id": 49,
                    "companyType": 2,
                    "item": "（1）一般计税方法选择6%税率",
                    "taxRate": "6%或5%",
                    "pid": 48
                },
                {
                    "id": 50,
                    "companyType": 2,
                    "item": "（2）简易计税方法选择5%征收率（不能抵扣增值税）。",
                    "taxRate": "6%或5%",
                    "pid": 48
                }
            ]
        }
    ]
}

module.exports = {
    dataList: json
}