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
    const cars = await this.controller.getCars();
    this.view.print(cars);
    const raceData = await this.controller.switchMoveMode('started');

    const animation = this.view.animation(
      1,
      raceData.velocity,
      raceData.distance,
    );

    try {
      await this.controller.switchMoveMode('drive');
    } catch (error) {
      animation.pause();
    }
  }
}
