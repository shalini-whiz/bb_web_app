import AuthService from "./AuthService";
import { urls,  API_BODY_BASE } from "../constants";




class APIService {

    createBodyContent(content) {
        let bodyContent = { ...API_BODY_BASE };
        let { req } = bodyContent;

        let userId = AuthService.getUserId();
        let userRole = AuthService.getUserRole();
        let userParams = {};
        userParams["accessorUserId"] = userId;
        userParams["accessorRole"] = userRole;
        userParams["writerRole"] = "self";


        let newReq = Object.assign(content, req);
        bodyContent.req = Object.assign(newReq, userParams);

        return bodyContent
    }




    apiCall(methodType, content, type) {

        let reqURL = urls[type];
        let bodyContent = this.createBodyContent(content);

        if (methodType === "POST")
            return fetch(reqURL, {
                method: "POST",
                body: JSON.stringify(bodyContent),
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + AuthService.getToken()
                },
                credentials: 'include',
            })
        else if (methodType === "GET") {


        }


    }

}

export default new APIService();