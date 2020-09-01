import BaseApiService from '@/plugins/BaseApiService'

class Server extends BaseApiService {
    constructor() {
        super();
        this.prefix = ''
        this.url = '';
    }

    register = (name: string, password: string) => this.request('/user/register', { name, password });
    create = (name: string, password: string) => this.request('/live/create', { name, password });
    destory = () => this.request('/live/destory');
    user = () => this.request('/live/user');
}

export default new Server();