import axios from "axios";

class BaseApiService {
  constructor() {
    this.prefix = null;
    this.url = "";
    this.axios = axios;
  }

  request(path, options) {
    return new Promise((resolve, reject) => {
      console.log("HTTPRequest", this.url + this.prefix + path, options);
      this.axios
        .post(this.url + this.prefix + path, options || {})
        .then((res) => {
          const { data } = res.data;
          if (data && Object.keys(data).length == 0) {
            res.data.data = null;
          }
          resolve(res.data);
        })
        .catch(reject);
    });
  }
}

export default BaseApiService;
