function getLoginStatus(){
    return getApp().globalData.userInfo.login;
}

const LoginCheck = {
    getLoginStatus:() => getLoginStatus(),
};
module.exports = {
    LoginCheck: LoginCheck
}