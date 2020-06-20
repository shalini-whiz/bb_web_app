import APIService from "./APIService";
const ANONY_USER = { "status": false, "user": null }
const VALID_USER = { "status": true, "user": null }



class AuthService {

    checkToken() {
        if (this.getToken() == null) {
            return ANONY_USER;
        }
        return VALID_USER;
    }
    checkUserInfo() {
        if (this.getUserInfo() == null) {
            return ANONY_USER;
        }
        return VALID_USER;
    }
    getUserType() {
        if (this.getUserInfo() !== null && this.getUserInfo() !== undefined) {
            let userInfo = this.getUserInfo();
            if (userInfo.roleType) return userInfo.roleType;
        }
        return undefined;
    }
    getUserRole() {
        if (this.getUserInfo() !== null && this.getUserInfo() !== undefined) {
            let userInfo = this.getUserInfo();
            if (userInfo.role) return userInfo.role;

        }
        return undefined;
    }
    getUserId() {
        if (this.getUserInfo() !== null && this.getUserInfo() !== undefined) {
            let userInfo = this.getUserInfo();
            if (userInfo._id) return userInfo._id;

        }
        return undefined;
    }

    getUserInfo() {
        if (localStorage.getItem("userInfo") !== undefined &&
            localStorage.getItem("userInfo") !== null &&
            localStorage.getItem("userInfo") !== "undefined") {
            return JSON.parse(localStorage.getItem("userInfo"));

        }
        return null;
    }

    setUserInfo(phoneNo) {
        if (this.getUserInfo() != null) {
            let obj = JSON.parse(localStorage.getItem("userInfo"));
            obj.uName.phoneNo = phoneNo;
            localStorage.setItem("userInfo", JSON.stringify(obj));
        }
    }

    getToken() {
        return localStorage.getItem("token");
    }

    isTokenAlive() {
        if (this.getToken() == null || this.getUserInfo() == null) return false;

        let params = {}
        params["token"] = this.getToken();
        let userInfo = this.getUserInfo();
        params["uName"] = userInfo.uName.email;
        params["role"] = userInfo.role;
        params["writerRole"] = "self";
        params["regenerate"] = true;

        return APIService.apiCall("POST", params, "validateToken")
            .then(response => {
                if (response.status == 200) return response;
                else {

                    localStorage.clear();
                    window.location.href = '/';
                }
            })
            .then(response => response.json())
            .then(response => {
                if (response && response.status === "success" && response.data && response.data.token) {
                    localStorage.setItem("token", response.data.token)
                    return true;
                }
                return false;

            });

    }
}

export default new AuthService();