
import titleize from "titleize"
import moment from "moment"
const commons = {}


commons.errorLog = (e) => {
    console.log(e)
}
commons.titleCase = (input) => {
    return titleize(input)
}

commons.isValidDate = (input) => {
    return moment(new Date(input)).isValid()
}

commons.toDateFormat = (input, dateFormat) => {
    if (!dateFormat) dateFormat = "DD-MM-YYYY"
    return moment(new Date(input)).format(dateFormat)
}
commons.fetchEntityRoleProfile = (data, role) => {
    let profileData = undefined
    if (role) {
        profileData = data.roles.find(item => item.type.toLowerCase() === role.toLowerCase())
    }
    else {
        profileData = data.roles[0]
    }
    if (profileData && profileData.profile)
        return profileData.profile
    return {}
}
commons.showError = () => {

}
commons.forceLogOut = () => {
    localStorage.clear();
    window.location.href = '/';
}
commons.checkIfFutureDate = (inputDate) => {
    var givenDate = moment(new Date(inputDate))
    var now = moment();
    return givenDate.isSameOrAfter(now, 'day');
}
commons.checkIfPastDate = (inputDate) => {
    var givenDate = moment(new Date(inputDate))
    var now = moment();
    return givenDate.isSameOrBefore(now, 'day');
}


export default commons;
