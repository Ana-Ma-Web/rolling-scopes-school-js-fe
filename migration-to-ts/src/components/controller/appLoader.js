import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            // apiKey: '13ecd8a3b11342a1bca792e17fc3e235', // получите свой ключ https://newsapi.org/
            apiKey: '', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
