import { Car } from '../../types';

export class AppView {
  public print(cars: Car[]): void {
    cars.forEach((e) => {
      const el = document.createElement('div');
      el.textContent = e.name;
      document.body.append(el);
      console.log(e.name);
    });
  }
}
