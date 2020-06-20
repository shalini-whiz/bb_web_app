

export const registerSupplierData = [
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
                "key": "city", "displayName": "city", "order": 4,
                "type": "string", "error": "", "value": "", "required": true
            },
            {
                "key": "state", "displayName": "State", "order": 5,
                "type": "string", "error": "", "value": "",
            },
            {
                "key": "pinCode", "displayName": "PIN", "order": 6,
                "type": "number", "error": "", "required": true,
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
                "key": "salutation", "displayName": "Salutation", "order": 1,
                "type": "string", "error": "", "value": "", "required": true
            },
            {
                "key": "fName", "displayName": "First Name", "order": 2,
                "type": "string", "error": "", "value": "", "required": true
            },
            {
                "key": "lName", "displayName": "Last Name", "order": 3,
                "type": "string", "error": "", "value": ""
            },

            {
                "key": "email", "displayName": "Email", "order": 4,
                "type": "string", "error": "", "value": "", "required": true
            },
            {
                "key": "phoneNo", "displayName": "Phone No", "order": 5,
                "type": "number", "error": "", "value": "",
            },
            {
                "key": "website", "displayName": "Website", "order": 6,
                "type": "string", "error": "", "value": "",
            },
            {
                "key": "role", "displayName": "Role", "order": 7,
                "type": "string", hidden: true,
                "error": "", "value": "supplier", "required": true,

            },
        ]
    },
    {
        "step": 3,
        "title": "Sales/Purchase Team",
        "formData": [

        ]
    },
    {
        "step": 2,
        "title": "Profile Details",
        "formData": [
            {
                "key": "writerRole", "displayName": "writerRole", "order": 23,
                "type": "hidden", "error": "", "value": "self", "defaultValue": "self",
                "disabled": true, "hidden": true,
            },
            {
                "key": "type", "displayName": "type", "order": 24,
                "type": "hidden", "error": "", "value": "organization",
                "defaultValue": "organization",
                "disabled": true, "hidden": true
            },
            {
                "key": "rootId", "displayName": "Parent", "order": 25,
                "type": "hidden", "error": "", "value": "",
                "disabled": true, "hidden": true,
                presetValue: true
            },
            {
                "key": "pId", "displayName": "Parent", "order": 26,
                "type": "hidden", "error": "", "value": "", "disabled": true, "hidden": true,
                presetValue: true

            },
        ]
    },
]

