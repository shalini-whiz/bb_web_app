export const loginForm = [
    {
        "key": "uName", "displayName": "User Name", "order": 1,
        "type": "string", "error": "", "value": "", "required": true
    },
    {
        "key": "password", "displayName": "Password", "order": 2,
        "type": "password", "error": "", "value": "",
        "required": true, "showPassword": false
    },
  
    {
        "key": "role", "displayName": "Role", "order": 3,
        "type": "select", "error": "", "value": "",
        "required": false, hidden: true
    },
    {
        "key": "writerRole", "displayName": "writerRole", "order": 4,
        "type": "hidden", "error": "", "value": "self",
        "required": true, "hidden": true,
    },

]
