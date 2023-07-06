const devURL = 'http://localhost:8001/';
const devIpURL = 'http://192.168.3.46:8001/';
const publishURL = getApp().globalData.requestUrl;
const myUrl = devURL;

function handleRequest(method, url, data, authHeader = false) {
    return new Promise((resolve, reject) => {
        const requestUrl = `${myUrl}${url}`;
        const header = {
            'content-type': 'application/json',
        };

        if (authHeader) {
            header.Authorization = getApp().globalData.userInfo.token;
        }

        wx.request({
            url: requestUrl,
            method: method,
            data: method === 'POST' ? JSON.stringify(data) : data,
            header: header,
            success(res) {
                if (res.statusCode === 200) {
                    resolve(res.data);
                } else {
                    reject(res);
                }
            },
            fail(err) {
                reject(err);
            },
        });
    });
}

function noAuthRequest(method, url, data = {}) {
    return handleRequest(method, url, data);
}

function authRequest(method, url, data = {}) {
    return handleRequest(method, url, data, true);
}

const API = {
    noAuthRequest,
    authRequest,
};

module.exports = {
    API: API,
};
