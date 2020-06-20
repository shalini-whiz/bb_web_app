export const regularExpData = [
    {
        name: "phoneNo",
        regExp: /^\d{10}$/,
        "message": "Invalid Phone Number"
    },
    {
        name: "email",
        regExp: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i,
        message: "Invalid Email Address"
    },
    {
        name: "phonenumber2",
        regExp: /^\d{10}$/,
        "message": "Invalid Phone Number"
    },
    {
        name: "pincode",
        regExp: /^\d{6}$/,
        "message": "Invalid Pincode"
    },
    {
        name: "dob",
        regExp: /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/i,
        message: "Invalid DOB"
    },
    {
        name: "dateofinc",
        regExp: /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/i,
        message: "Invalid DateOfInc"
    },
    {
        name: "affIdClsDt",
        regExp: /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/i,
        message: "Invalid Affiliation End Date"
    },
    {
        name: "affIdStDt",
        regExp: /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/i,
        message: "Invalid Affiliation Start Date"
    },
    {
        name: "affid",
        regExp: /^[a-zA-z0-9]{3,10}$/i,
        "message": "Affiliation required with a range 3-10 characters "
    },
    {
        name: 'uName',
        regExp: /^(?:\d{10}|\w+@\w+\.\w{2,3})$/i,
        message: "Valid email or phone required"
    },
    {
        name: "password",
        regExp: /^[0-9a-zA-Z@#]{6,30}$/i,
        "message": "password of range 8-30 length required"
    },
    {
        name: "confirmpassword",
        regExp: /^[0-9a-zA-Z@#]{8,30}$/i,
        "message": "Passwords don't match"
    },
    {
        name: "otp",
        regExp: /^[0-9]{4}$/i,
        "message": "4 digits otp required"
    },
    {
        name: "level",
        regExp: /^[0-9]{1,2}$/i,
        "message": "level required of range 1-2 digits "
    },
    {
        name: "fname",
        regExp: /^[a-zA-z]{3,25}$/i,
        "message": "First Name required with a range 3-25 characters "
    },
    {
        name: "role",
        regExp: /^[a-zA-z]{3,25}$/i,
        "message": "Role required with a range 3-25 characters "
    },
    {
        name: "password",
        regExp: /^.{5,15}$/i,
        "message": "password required with minimum 5 characters"
    },
    // {
    //     name: "isallusersdisabled",
    //     regExp: /^(true|false)$/,
    //     "message": "all users disabled/enabled selection required"
    // },
    {
        name: 'gender',
        regExp: /^male$|^female$/,
        "message": "Allowed gender : male/female"
    },
    {
        name: 'afftype',
        regExp: /^type1$/,
        message: "Allowed Affiliation Type : type1"
        // regExp: /^type1$|^custom$/,
        //"message": "Allowed Affiliation Type : type1/custom"
    },
    {
        name: "affidstatus",
        regExp: /^active$|^inactive$/,
        message: "Allowed Affiliation status : active/inactive"
    },
    {
        name: "isallusersdisabled",
        regExp: /^(true|false)$/,
        message: "Allowed Users Disabled values : true/false"
    },
    {
        name: "orgname",
        regExp: /^[a-zA-z\s]{3,25}$/i,
        "message": "Org Name required with a range 3-25 characters "
    },
    {
        name: "orgabbreviation",
        regExp: /^[a-zA-z0-9]{3,25}$/i,
        "message": "Org Abbreviation required with a range 3-25 characters "
    },
    {
        name: "website",
        regExp: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$|^(?=.*[^\.]$)((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.?){4}$/,
        "message": "Invalid website"
    }
]
