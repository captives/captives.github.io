import axios from 'axios';

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