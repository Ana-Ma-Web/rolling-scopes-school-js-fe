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
    this.view.print(
      this.controller.getRacers.bind(this.controller),
      this.controller.switchMoveMode.bind(this.controller),
      this.controller.createRacer.bind(this.controller),
      this.controller.updateRacer.bind(this.controller),
    );
  }
}
