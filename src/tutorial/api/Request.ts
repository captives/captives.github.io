import axios from 'axios';

const request = (path: string, data: any = null) => {
    return new Promise((resolve, reject) => {
        axios.post(location.origin.replace(location.port, location.protocol == 'http:' ? '2010' : '2020') + path, data).then(({ data }) => resolve(data)).catch(reject);
    });
};

export default request;