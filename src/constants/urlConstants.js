
export const APP_BASE_URL = 'http://localhost:8080/';


export const API_BODY_BASE = {
    "test_ctrl": {
        "test_mode": false,
        "return_data1": {
            "status": "pass",
            "msg": "",
            "data": {},
            "errors": []
        }
    },
    "req": {
        "caller": "vLwa06k7ebKurc4mD4dQUSm",
        "apiKey": "e8LJyTCWzWRZv9n9VQFA"
    }
}

export const urls = {
    "logout": APP_BASE_URL + "user/logout",
    "login": APP_BASE_URL + 'user/userLogin',
    "guestToken": APP_BASE_URL + "admin/generateGuestToken",
    "validateToken": APP_BASE_URL + "user/isValidated",
    "createBusiness": APP_BASE_URL + "business",
    "getDefaultInvoices": APP_BASE_URL + "supplier/getDefaultInvoices",
    "generateInvoice": APP_BASE_URL + "supplier/generateInvoice",
    "getInvoices": APP_BASE_URL + "supplier/getInvoices",
    "setInvoice": APP_BASE_URL + "supplier/setInvoiceDetails",
    "getDetails": APP_BASE_URL + "supplier/getDetails",
    "setOfflinePayment": APP_BASE_URL + "supplier/setInvoiceOfflinePayment",
    "setSettings": APP_BASE_URL + "financial/setSettings",
    "getSettings": APP_BASE_URL + "financial/getSettings",
    "invoiceReceipt": APP_BASE_URL + "supplier/invoiceReceipt",
    "getEntityDetails": APP_BASE_URL + "business/getEntityDetails"
}