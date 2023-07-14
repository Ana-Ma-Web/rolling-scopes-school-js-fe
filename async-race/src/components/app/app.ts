import { AppController } from '../controller/controller';
import { AppView } from '../view/appView';

export class App {
  private controller: AppController;

  private view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  public async start(): Promise<void> {
    const cars = await this.controller.getCars();
    this.view.print(cars);
  }
}
