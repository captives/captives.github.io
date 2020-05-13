import axios from 'axios';

// const OPENVIDU_SERVER_URL = "https://demos.openvidu.io:4443";
const OPENVIDU_SERVER_URL = "https://local.uuabc.com:4443";
const OPENVIDU_SERVER_SECRET = "MY_SECRET";

let createSession = (sessionId) => {
    let option = {
        method: 'POST',
        url: OPENVIDU_SERVER_URL + "/api/sessions",
        data: JSON.stringify({ customSessionId: sessionId }),
        headers: {
            "Authorization": "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
            "Content-Type": "application/json"
        },
    };
    console.log('>>>', option.method, option);
    // See https://openvidu.io/docs/reference-docs/REST-API/#post-apisessions
    return new Promise((resolve, reject) => {
        axios.post(option).then(response => resolve(response.id))
            .catch(function (error) {
                if (error.status === 409) {
                    resolve(sessionId);
                } else {
                    console.warn('未连接到OpenVidu服务器。这可能是以下位置的证书错误 ' + OPENVIDU_SERVER_URL);
                    if (window.confirm('未连接到OpenVidu服务器。这可能是以下位置的证书错误' + OPENVIDU_SERVER_URL + '; 单击“确定”导航并接受它。' +
                        '如果没有显示证书警告，请检查OpenVidu服务器是否已在 "' + OPENVIDU_SERVER_URL + '"')) {
                        // location.assign(OPENVIDU_SERVER_URL + '/accept-certificate');
                    }
                }
            });

        // $.ajax({
        //     type: "POST",
        //     url: OPENVIDU_SERVER_URL + "/api/sessions",
        //     data: JSON.stringify({ customSessionId: sessionId }),
        //     headers: {
        //         "Authorization": "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
        //         "Content-Type": "application/json"
        //     },
        //     success: response => resolve(response.id),
        //     error: (error) => {
        //         if (error.status === 409) {
        //             resolve(sessionId);
        //         } else {
        //             console.warn('No connection to OpenVidu Server. This may be a certificate error at ' + OPENVIDU_SERVER_URL);
        //             if (window.confirm('No connection to OpenVidu Server. This may be a certificate error at \"' + OPENVIDU_SERVER_URL + '\"\n\nClick OK to navigate and accept it. ' +
        //                 'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' + OPENVIDU_SERVER_URL + '"')) {
        //                 // location.assign(OPENVIDU_SERVER_URL + '/accept-certificate');
        //             }
        //         }
        //     }
        // });
    });
}

let createToken = (sessionId) => {
    // // See https://openvidu.io/docs/reference-docs/REST-API/#post-apitokens
    return new Promise((resolve, reject) => {
        axios.post({
            method: 'post',
            url: OPENVIDU_SERVER_URL + "/api/tokens",
            data: JSON.stringify({ session: sessionId }),
            headers: {
                "Authorization": "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
                "Content-Type": "application/json"
            },
        }).then(response => resolve(response.id))
            .catch(error => reject(error));
        //     $.ajax({
        //         type: "POST",
        //         url: OPENVIDU_SERVER_URL + "/api/tokens",
        //         data: JSON.stringify({ session: sessionId }),
        //         headers: {
        //             "Authorization": "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
        //             "Content-Type": "application/json"
        //         },
        //         success: response => resolve(response.token),
        //         error: error => reject(error)
        //     });
    });
}

export default {
    url: OPENVIDU_SERVER_URL,
    secret: OPENVIDU_SERVER_SECRET
};

export {
    createSession, createToken,
}