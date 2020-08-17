export default {}

export const UserType = {
    PRESIDE: 1,  //主持者
}

export const RoleType = { PUBLISHER: 1, SUBSCRIBER: 2, 1: "PUBLISHER", 2: "SUBSCRIBER" };
export const localTime = time => {
    const date = new Date(time);
    if (date.toLocaleDateString() == new Date().toLocaleDateString()) {
        return date.toLocaleTimeString('chinese', { hour12: false });
    } else {
        return date.toLocaleString('chinese', { hour12: false });
    }
}

export const formatTimeValue = value => {
    value = Math.floor(value / 1000);
    var tag = "-";
    if (value >= 0) {
        tag = "";
    }
    // default format: hours:minutes:seconds
    value = Math.round(Math.abs(value));
    var hours = Math.floor(value / 3600) % 24;
    var minutes = Math.floor(value / 60) % 60;
    var seconds = value % 60;
    var result = "";

    if (hours != 0)
        result = hours + ":";

    if (result && minutes < 10)
        result += "0" + minutes + "";
    else
        result += minutes + "";

    if (seconds < 10)
        result += ":0" + seconds;
    else
        result += ":" + seconds;

    return tag + result;
}