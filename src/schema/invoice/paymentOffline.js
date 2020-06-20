
import { commons } from "../../utils";
import moment from "moment"

export const paymentOfflineData = [
    {
        "key": "transactionDate", "displayName": "Transaction Date", "order": 1,
        "type": "date", "error": "", "value": moment(new Date()).format("YYYY-MM-DD"),
        "required": true, "defaultValue": moment(new Date()).format("YYYY-MM-DD"),
        "validatorFunc": commons.checkIfPastDate,
        "validatorMsg": "Date shoud be past date"
    },
    {
        "key": "paymentMode", "displayName": "Payment Mode", "order": 2,
        "type": "string", "error": "", "value": ""
    },
    {
        "key": "paymentDesc", "displayName": "Description", "order": 2,
        "type": "string", "error": "", "value": "","rows":4,"rowsMax":4,"multiline": true
    },
]