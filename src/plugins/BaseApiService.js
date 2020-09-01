import axios from 'axios';

//每次向后端请求都带上cookie，后端就不会被认为是不同用户导致session丢失
axios.defaults.withCredentials = true;

class BaseApiService {
    constructor() {
        this.prefix = ''
        this.url = '';
        this.axios = axios;
    }

    request(path, options) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.prefix + path, options || {}).then(res => {
                const { code, message } = res.data;
                if (code === 10001) { //no authority
                    window.location.href = `/error.html?code=${code}`;//&message=${message}
                } else {
                    resolve(res.data);
                }
            }).catch(reject);
        });
    }
}

export default BaseApiService;