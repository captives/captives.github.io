const queryGet = (name) => {
    const i = window.location.hash.indexOf('?') > 0 ? window.location.hash.indexOf('?') : window.location.hash.length;
    const search = window.location.hash.substr(i + 1);
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    const r = decodeURIComponent(search).substr(1).match(reg);
    return r ? unescape(r[2]) : r;
};

const hashGetData = () => {
    const i = window.location.hash.indexOf('?') > 0 ? window.location.hash.indexOf('?') : window.location.hash.length;
    const path = window.location.hash.substr(1, i - 1);
    const search = window.location.hash.substr(i + 1);
    let r = {};
    if (search) {
        decodeURIComponent(search).split('&').map(item => {
            const list = item.split('=');
            r[list[0]] = list[1];
        })
    }
    return {...window.location, path, query: r };
}

export {
    queryGet,
    hashGetData
}