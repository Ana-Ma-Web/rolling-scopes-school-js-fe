import { AppController } from '../controller/controller';
import { AppView } from '../view/appView';
import './app.css';

export class App {
  private controller: AppController;

  private view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  public async start(): Promise<void> {
    const { items, count } = await this.controller.getRacers();
    console.log('count', count);
    this.view.print(
      items,
      this.controller.switchMoveMode.bind(this.controller),
    );
  }
}
