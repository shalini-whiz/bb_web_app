import { regularExpData } from "../constants";
import AuthService from "../service/AuthService";
import React from 'react';
import { EmailOutlined, Phone, CompassCalibrationOutlined } from '@material-ui/icons';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import { ListItemAvatar } from "@material-ui/core";
import { func } from "prop-types";

//1Mb
const fileSizeLimit = 1 * 1000 * 1000;

const util = {}







util.fetchSteps = async (arr) => {

    let result = arr.map(x => x.title);
    return result;

}

util.findByKey = async (arr, key) => {
    return await arr.find(item => {
        return item.key === key
    })
}
util.mergeArr = (template, arr) => {
    let result = template.map(x => Object.assign(x, arr.find(y => y.key === x.key)));
    return result;
}
util.sortArr = (arr, key) => {
    return arr.sort((a, b) => parseFloat(a[key]) - parseFloat(b[key]));
}





util.chunkArray = (chunk_size, arr) => {

    return arr.map(function (e, i) {
        return i % chunk_size === 0 ? arr.slice(i, i + chunk_size) : null;
    }).filter(function (e) { return e; });

}

util.validateFile = (file, fileSizeLimit, fileTypes) => {
    let resJson = { "status": true, "msg": "" }
    if (file == null) {
        resJson["status"] = false;
        resJson["msg"] = "Please upload file"
    }
    if (file) {
        let fileMsg = "";

        if (file.size > fileSizeLimit) fileMsg += "File cannot exceed 1 MB"
        if (fileTypes.indexOf(file.type) === -1) fileMsg += " File must be of csv format";
        if (fileMsg.length) {
            resJson["status"] = false;
            resJson["msg"] = fileMsg

        }
    }
    return resJson

}

util.validataCSVData = (obj, dataRules) => {

    let data = obj.data;
    let errors = obj.errors;
    Object.keys(data).forEach(key => {


        if (data[key] != undefined && data[key].toString().length > 0) {
            data[key] = data[key].trim()
        }
        let value = data[key];


        let fieldObj = regularExpData.find(obj => obj.name.toLowerCase() === key.toLowerCase())
        if (fieldObj && fieldObj.regExp) {
            if (value != undefined && value.toString().length > 0) {
                {
                    let status = fieldObj.regExp.test(value) ? true : false;
                    if (!status) errors.push(fieldObj.message)
                }

            }
            else {

                if (dataRules) {
                    if (dataRules.required && dataRules.required.length) {
                        if (dataRules.required.indexOf(key) > -1) {
                            if (value == undefined || (value != undefined && value.toString().trim().length === 0)) {
                                errors.push(key + " required")
                            }
                        }
                    }
                    //def values check 
                }


            }
        }

    });

    return obj;
}

util.validateForm = (obj, errors) => {

    Object.keys(obj).forEach(key => {
        let value = obj[key];
        let fieldObj = regularExpData.find(obj => obj.name.toLowerCase() === key.toLowerCase())
        if (fieldObj && fieldObj.regExp) {
            let status = fieldObj.regExp.test(value) ? true : false;
            status ? errors[key] = '' : errors[key] = fieldObj.message;

        }
    });

    return errors;
}

util.verifyPassword = (obj) => {
    let passwordObj = obj.find(obj => obj.key.toLowerCase() === "password");
    let confirmPasswordObj = obj.find(obj => obj.key.toLowerCase() === "confirmpassword");
    if (passwordObj && confirmPasswordObj && passwordObj.value !== confirmPasswordObj.value) {
        obj.find(item => {
            if (item.key.toLowerCase() === "confirmpassword")
                item.error = "Reconfirm the password"
        })


    }
    return obj
}


util.validateObj = async (obj) => {
    let value = obj["value"];
    let fieldObj = regularExpData.find(item => item.name.toLowerCase() === obj["key"].toLowerCase())
    if (fieldObj && fieldObj.regExp) {
        let status = fieldObj.regExp.test(value) ? true : false;
        status ? obj['error'] = '' : obj['error'] = fieldObj.message;
    }
    return obj;
}
util.validateFormData = async (obj) => {
    obj.map(item => {
        if (item.value != undefined && item.value != null && item.type !== "number" && item.value.toString().length) {
            item.value = (typeof (item["value"]) == "string") ? item["value"].trim() : item["value"]

        }
        let value = item["value"];
        console.log(item.value)
        if (item.type == "number" && item.value.toString().length > 0) item.value = parseInt(value)
        // if (item.type == "number" && item.value.toString().length == 0) item.value = 0
        console.log(item.value)



        item.error = ""
        if (item.required) {

            if (item.value == undefined ||
                (item.value != undefined && item.value.toString().length === 0)
            ) {
                item["error"] = item.displayName + " required";
            }
        }



        let fieldObj = regularExpData.find(obj => obj.name.toLowerCase() === item["key"].toLowerCase())
        if (fieldObj && fieldObj.regExp) {

            if (value != undefined && value.toString().length > 0
                //&& (item.type === "number" && item.value != 0)

            ) {
                let status = fieldObj.regExp.test(value) ? true : false;
                if (status) {
                    item["error"] = "";
                    if (item.validatorFunc) {
                        let status1 = item.validatorFunc(value);
                        if (!status1) (item.validatorMsg ? item["error"] = item.validatorMsg : item["error"] = "Invalid data")
                    }
                }
                else
                    item['error'] = fieldObj.message;
            }

        }

    })

    obj = await util.verifyPassword(obj);



    return obj;
}


util.filterFormData = async (obj) => {
    let apiFormData = [...obj];
    let formData = {};
    apiFormData.map(item => {
        if (item.value != undefined && item.value != null) {


            if (item.type == "number" && item.value.toString().length === 0) {
            }

            else {
                let key = item["key"];
                let value = item["value"];
                formData[key] = value;
            }


        }

    })
    return formData
}


export default util;