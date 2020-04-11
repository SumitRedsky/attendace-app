export let isFieldEmpty = text => {
    if (text == "") {
        return true;
    }
    return false;
}

export let passwordPattern = password => {
    if (password.length <= 5 && password != undefined && password != null && password != "") {
        return true;
    }
    return false;
}
export let isValidEmail = email => {
    var reg = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!reg.test(email)) {
        return true;
    }
    return false;
}
export let isValidPhoneNumber = phone => {
    if (phone < 10) {
        return true;
    }
    return false;
}
export let isValidComparedPassword = (password, confirmPassword) => {
    if (password != confirmPassword) {
        return true;
    }
    return false;
}