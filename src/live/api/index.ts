import BaseApiService from '@/plugins/BaseApiService'

class Server extends BaseApiService {
    constructor() {
        super();
        this.prefix = '/live'
        this.url = '';
    }

    create = (name: string, password: string) => this.request('/create', { name, password });
    destory = () => this.request('/destory');
    user = () => this.request('/user');
}

export default new Server();