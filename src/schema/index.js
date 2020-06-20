import { loginForm, changePasswordForm } from "./user";
import { registerSupplierData, registerBusinessData, entityProfile, financialSettingsData } from "./entity"
import { paymentOfflineData,statusList } from "./invoice"

import { genInvoiceColumns, paymentReportColumns } from "./tableSchema"
import { register } from "../serviceWorker";

const fetchFormByType = (type) => {

    if (type === "loginForm") {

        let mergedArr = [];
        mergedArr.push(...loginForm);
        return mergedArr;
    }
    else if (type === "registerSupplier") {
        let mergedArr = [];
        registerSupplierData.forEach((value) => {
            mergedArr.push({ ...value })
        })
        return mergedArr;
    }
    else if (type === "registerBusiness") {
        let mergedArr = [];
        registerBusinessData.forEach((value) => {
            mergedArr.push({ ...value })
        })
        return mergedArr;
    }
    else if (type === "entityProfile") {
        let mergedArr = [];
        entityProfile.forEach((value) => {
            mergedArr.push({ ...value })
        })
        return mergedArr;
    }
    else if (type === "paymentOffline") {
        let mergedArr = [];
        paymentOfflineData.forEach((value) => {
            mergedArr.push({ ...value })
        })
        return mergedArr;
    }
    else if (type === "financialAccProfile") {
        let mergedArr = [];
        financialSettingsData.forEach((value) => {
            
            mergedArr.push({ ...value })
        })
        return mergedArr;
    }
}



export {
    fetchFormByType,statusList,genInvoiceColumns,paymentReportColumns
}