

export const registerBusinessData = [
    {
        "step": 0,
        "title": "Contact Details",
        "formData": [
            {
                "key": "orgName", "displayName": "Entity", "order": 1,
                "type": "string", "error": "", "value": "", "required": true
            },
            {
                "key": "abbreviation", "displayName": "Abbreviation", "order": 2,
                "type": "string", "error": "", "value": "", "required": true
            },
            {
                "key": "address", "displayName": "Address", "order": 3,
                "type": "string", "error": "", "value": ""
            },
            {
                "key": "city", "displayName": "City", "order": 4,
                "type": "string", "error": "", "value": "", "required": true
            },
            {
                "key": "state", "displayName": "State", "order": 5,
                "type": "string", "error": "", "value": "", "required": true
            },
            {
                "key": "pinCode", "displayName": "PIN", "order": 6,
                "type": "number", "error": "", "required": true, "value": ""
            },
            {
                "key": "country", "displayName": "Country", "order": 7,
                "type": "string", "error": "", "value": "India", "defaultValue": "India",
            },
        ]
    },
    {
        "step": 1,
        "title": "Validate",
        "formData": [
            {
                "key": "email", "displayName": "Email", "order": 1,
                "type": "string", "error": "", "value": "",
            },
            {
                "key": "phoneNo", "displayName": "Phone No", "order": 2,
                "type": "number", "error": "", "value": "", "required": true
            },
            {
                "key": "website", "displayName": "Website", "order": 3,
                "type": "string", "error": "", "value": "", required: true
            },
            {
                "key": "role", "displayName": "Role", "order": 4,
                "type": "string", hidden: true,
                "error": "", "value": "business", "required": true,

            },
        ]
    },
    // {
    //     "step": 2,
    //     "title": "Sales/Purchase Team",
    //     "formData": [
    //         {
    //             "key": "sales", "displayName": "Default Sales", "order": 1,
    //             "type": "checkbox", "error": "",
    //             "checkbox": true, required: true, value: true
    //         },
    //         {
    //             "key": "purchase", "displayName": "Default Purchase", "order": 1,
    //             "type": "checkbox", "error": "",
    //             "checkbox": true, required: true, value: true

    //         },
    //     ]
    // },
    {
        "step": 2,
        "title": "Profile Details",
        "formData": [
            {
                "key": "invoiceDay", "displayName": "Invoice Day", "order": 1,
                "type": "select", "error": "",
                "select": true, required: true,
                "options": [
                    { "value": 1, "key": 1 },
                    { "value": 2, "key": 2 },
                    { "value": 3, "key": 3 },
                    { "value": 4, "key": 4 },
                    { "value": 5, "key": 5 },
                    { "value": 6, "key": 6 },
                    { "value": 7, "key": 7 },
                    { "value": 8, "key": 8 },
                    { "value": 9, "key": 9 },
                    { "value": 10, "key": 10 },
                    { "value": 11, "key": 11 },
                    { "value": 12, "key": 12 },
                    { "value": 13, "key": 13 },
                    { "value": 14, "key": 14 },
                    { "value": 15, "key": 15 },
                    { "value": 16, "key": 16 },
                    { "value": 17, "key": 17 },
                    { "value": 18, "key": 18 },
                    { "value": 19, "key": 19 },
                    { "value": 20, "key": 20 },
                    { "value": 21, "key": 21 },
                    { "value": 22, "key": 22 },
                    { "value": 23, "key": 23 },
                    { "value": 24, "key": 24 },
                    { "value": 25, "key": 25 },
                    { "value": 26, "key": 26 },
                    { "value": 27, "key": 27 },
                    { "value": 28, "key": 28 },
                ],

            },
            {
                "key": "invoiceAmt", "displayName": "Invoice Amount", "order": 2,
                "type": "number", "error": "", "value": "", "defaultValue": "", required: true,

            },
            {
                "key": "sales", "displayName": "Default Sales", "order": 3,
                "type": "checkbox", "error": "",
                "checkbox": true, required: true, value: true
            },
            {
                "key": "purchase", "displayName": "Default Purchase", "order": 3,
                "type": "checkbox", "error": "",
                "checkbox": true, required: true, value: true

            },
            {
                "key": "writerRole", "displayName": "writerRole", "order": 5,
                "type": "hidden", "error": "", "value": "self", "defaultValue": "self",
                "disabled": true, "hidden": true,

            },
            {
                "key": "writerRole", "displayName": "writerRole", "order": 6,
                "type": "hidden", "error": "", "value": "self", "defaultValue": "self",
                "disabled": true, "hidden": true,
            },
            {
                "key": "type", "displayName": "type", "order": 7,
                "type": "hidden", "error": "", "value": "organization",
                "defaultValue": "organization",
                "disabled": true, "hidden": true
            },
            {
                "key": "rootId", "displayName": "Parent", "order": 8,
                "type": "hidden", "error": "", "value": "",
                "disabled": true, "hidden": true,
                presetValue: true
            },
            {
                "key": "pId", "displayName": "Parent", "order": 9,
                "type": "hidden", "error": "", "value": "", "disabled": true, "hidden": true,
                presetValue: true

            },
        ]
    },
]

