const fs = require('fs');

const json = require('./AreaData.js').areaList;

const subinput = [
    null,
    json.provinces,
    json.cities,
    json.counties
]

const recordify = (v, n=0)=>v.replace(/0+$/, '').padEnd(n, '0');

let roots = Object.keys(json.provinces).map(k=>{
    // let numk = parseInt(k);
    return {
        label: json.provinces[k],
        record: recordify(k, 2),
        value: k,
        children: []
    }
});

function pushData(root, data, d){
    // console.log(root, data, d);
    Object.entries(data).forEach(([k, v])=>{
        const subroot = root.find(({record})=>k.startsWith(record));
        if(!subroot || v == '全部') return;
        const padN = d * 2;
        let obj = {
            label: v,
            record: recordify(k, padN),
            value: k
        };
        if(padN != 6) obj.children = [];
        // console.log(subroot, obj, d);
        subroot.children.push(obj);
        if(subinput[d + 1]) pushData(subroot.children, subinput[d + 1], d + 1);
    });
}

pushData(roots, subinput[2], 2);

console.log(JSON.stringify(roots, null, 2));
