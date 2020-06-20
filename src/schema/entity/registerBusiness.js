

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
                "options": [{ "value": 1, "key": 1 }, { "value": 2, "key": 2 }],

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

