import commons from "../../util/commons";


export const verifyAccount = [
    {
        "step": 0,
        "title": "Account Details",
        "formData": [

            {
                "key": "email", "displayName": "Email", "order": 1,
                "type": "string", "error": "", "value": "", "required": true,
                disabled: true

            },
            {
                "key": "phoneNo", "displayName": "Phone No", "order": 2,
                "type": "number", "error": "", "value": "", "required": true,
            }
        ]
    },
    {
        "step": 1,
        "title": "Verify  OTP",
        "formData": [

            {
                "key": "otp", "displayName": "OTP", "order": 1,
                "type": "number", "error": "", "value": "", "required": true,

            }
        ]
    },



]