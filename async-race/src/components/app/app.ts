import { AppView } from '../view/appView';
import './app.css';

export class App {
  private view: AppView;

  private isWin = false;

  private winners = [0];

  constructor() {
    this.view = new AppView();
  }

  public async start(): Promise<void> {
    this.view.print();
  }
}
