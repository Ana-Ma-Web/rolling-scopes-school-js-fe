import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    private controller: AppController;

    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const body = document?.querySelector('body');

        document
            ?.querySelector('.sources')
            ?.addEventListener('click', (e) => this.controller.getNews(e, (data) => this.view.drawNews(data)));
        this.controller.getSources((data) => this.view.drawSources(data));

        document?.querySelector('.menu-btn')?.addEventListener('click', () => body?.classList.toggle('open-menu'));
    }
}

export default App;
