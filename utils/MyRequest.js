const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const FORM = 'FORM';
const DELETE = 'DELETE';

const devURL = 'http://localhost:8001/';
const devIpURL = 'http://192.168.3.46:8001/';
const publishURL = getApp().globalData.requestUrl;
const myUrl = devURL

function noAuthRequest(method, url, data) {
    return new Promise(function (resolve, reject) {
        wx.request({
            url: myUrl + url,
            method: method,
            data: method === POST ? JSON.stringify(data) : data,
            header: {
                'content-type': 'application/json',
            },
            success(res) {
                if(res.statusCode === 200){
                    resolve(res.data);
                }else{
                    reject(res)
                }
            },
            fail(err) {
                //请求失败
                reject(err)
            }
        })
    }) 
}

function authRequest(method, url, data) {
    return new Promise(function (resolve, reject) {
        wx.request({
            url: myUrl + url,
            method: method,
            data: method === POST ? JSON.stringify(data) : data,
            header: {
                'content-type': 'application/json',
                Authorization:getApp().globalData.userInfo.token,
            },
            success(res) {
                if(res.statusCode === 200){
                    resolve(res.data);
                }else{
                    reject(res)
                }
            },
            fail(err) {
                //请求失败
                reject(err)
            }
        })
    })
}

const API = {
    noAuthRequest: (method, url, data) => noAuthRequest(method, url, data),
    authRequest:(method, url, data) => authRequest(method, url, data),
};
module.exports = {
    API: API
}