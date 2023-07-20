import { CreateRacerProps, GetRacersData, Racer } from '../../../types';
import { Button } from '../ui/button';

export class Form {
  private selectedId = 0;

  private newInputValue = 'Anonym';

  private updInputValue = 'Anonym';

  private newColorValue = '#000000';

  private updColorValue = '#000000';

  public setSelectedId(id: number): void {
    this.selectedId = id;
    const selectBtn = <HTMLButtonElement>(
      document.querySelector('button[data-type="btn-update"]')
    );
    selectBtn.disabled = false;
    console.log(this.selectedId);
  }

  private input(props: {
    type: 'text' | 'color';
    inputDatasetType: string;
    class: string;
  }): HTMLInputElement {
    const input = document.createElement('input');
    input.type = props.type;
    input.dataset.type = props.inputDatasetType;
    input.classList.add('input', `input-${props.type}`, props.class);
    return input;
  }

  private createRacer(props: {
    createRacer: (props: CreateRacerProps) => Promise<Racer>;
  }): void {
    props.createRacer({
      color: this.newColorValue,
      name: this.newInputValue ? this.newInputValue : 'Anonym',
    });
  }

  private updateRacer(props: {
    updateRacer: (props: Racer) => Promise<Racer>;
  }): void {
    props.updateRacer({
      id: this.selectedId,
      color: this.updColorValue,
      name: this.updInputValue ? this.updInputValue : 'Anonym',
    });
  }

  private clickFormHandler(props: {
    createRacer: (props: CreateRacerProps) => Promise<Racer>;
    updateRacer: (props: Racer) => Promise<Racer>;
    getRacers: () => Promise<GetRacersData>;
    updateGarageTracks: (
      getRacers: () => Promise<GetRacersData>,
    ) => Promise<void>;
  }): void {
    const form = document.querySelector('.form');
    form?.addEventListener('click', (e) => {
      const target = <HTMLElement>e.target;

      switch (target.dataset.type) {
        case 'btn-create':
          e.preventDefault();
          this.createRacer(props);
          props.updateGarageTracks(props.getRacers);
          break;
        case 'btn-update':
          e.preventDefault();
          this.updateRacer(props);
          props.updateGarageTracks(props.getRacers);
          break;
        default:
          break;
      }
    });
  }

  private InputsHandler(): void {
    const form = document.querySelector('.form');

    const inputCreateName = form?.querySelector(
      'input[data-type="input-create-name"]',
    );
    const inputCreateColor = form?.querySelector(
      'input[data-type="input-create-color"]',
    );
    const inputUpdateName = form?.querySelector(
      'input[data-type="input-update-name"]',
    );
    const inputUpdateColor = form?.querySelector(
      'input[data-type="input-update-color"]',
    );

    inputCreateName?.addEventListener('change', (e) => {
      const target = <HTMLInputElement>e.target;
      this.newInputValue = target.value;
    });
    inputCreateColor?.addEventListener('change', (e) => {
      const target = <HTMLInputElement>e.target;
      this.newColorValue = target.value;
    });
    inputUpdateName?.addEventListener('change', (e) => {
      const target = <HTMLInputElement>e.target;
      this.updInputValue = target.value;
    });
    inputUpdateColor?.addEventListener('change', (e) => {
      const target = <HTMLInputElement>e.target;
      console.log(target.value);
      this.updColorValue = target.value;
    });
  }

  private listeners(props: {
    createRacer: (props: CreateRacerProps) => Promise<Racer>;
    updateRacer: (props: Racer) => Promise<Racer>;
    getRacers: () => Promise<GetRacersData>;
    updateGarageTracks: (
      getRacers: () => Promise<GetRacersData>,
    ) => Promise<void>;
  }): void {
    this.clickFormHandler(props);
    this.InputsHandler();
  }

  private createInputRow(type: 'create' | 'update'): HTMLDivElement {
    const inputsRow = document.createElement('div');
    inputsRow.classList.add('form__row');

    const button = new Button();
    const inputBtn = button.createBtn({
      textContent: type === 'update' ? 'Update' : 'Create',
      isDisabled: type === 'update',
      rootClass: 'form',
      modClass: type,
      datasetType: `btn-${type}`,
    });

    inputsRow.append(
      this.input({
        type: 'text',
        inputDatasetType: `input-${type}-name`,
        class: `form__input_${type}-name`,
      }),
      this.input({
        type: 'color',
        inputDatasetType: `input-${type}-color`,
        class: `form__input_${type}-color`,
      }),
      inputBtn,
    );

    return inputsRow;
  }

  public createForm(): HTMLElement {
    const form = document.createElement('form');
    form.classList.add('form');

    const inputsCreate = document.createElement('div');
    inputsCreate.classList.add('form__row');
    const inputsUpdate = document.createElement('div');
    inputsUpdate.classList.add('form__row');

    form.append(this.createInputRow('create'), this.createInputRow('update'));

    return form;
  }

  public printForm(props: {
    createRacer: (props: CreateRacerProps) => Promise<Racer>;
    updateRacer: (props: Racer) => Promise<Racer>;
    getRacers: () => Promise<GetRacersData>;
    updateGarageTracks: (
      getRacers: () => Promise<GetRacersData>,
    ) => Promise<void>;
  }): void {
    const garage = document.querySelector('.garage');
    garage?.append(this.createForm());
    this.listeners(props);
  }
}
