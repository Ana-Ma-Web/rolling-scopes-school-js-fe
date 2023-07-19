import { Button } from '../ui/button';

export class Form {
  private newInputValue = '';

  private updInputValue = '';

  private newColorValue = '';

  private updColorValue = '';

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

  private clickFormHandler(): void {
    const form = document.querySelector('.form');
    form?.addEventListener('click', (e) => {
      const target = <HTMLElement>e.target;

      switch (target.dataset.type) {
        case 'btn-create':
          e.preventDefault();
          console.log('switch');
          break;
        case 'btn-update':
          e.preventDefault();
          console.log('switch');
          break;
        default:
          break;
      }
    });
  }

  private textInputHandler(): void {
    const form = document.querySelector('.form');

    form?.addEventListener('keyup', (e) => {
      const target = <HTMLInputElement>e.target;

      switch (target.dataset.type) {
        case 'input-create-name':
          this.newInputValue = target.value;
          break;
        case 'input-update-name':
          this.updInputValue = target.value;
          break;
        default:
          break;
      }
    });
  }

  private colorInputHandler(): void {
    const form = document.querySelector('.form');

    const inputCreateColor = form?.querySelector(
      'input[data-type="input-create-color"]',
    );

    inputCreateColor?.addEventListener('change', (e) => {
      const target = <HTMLInputElement>e.target;
      this.newColorValue = target.value;
    });

    const inputUpdateColor = form?.querySelector(
      'input[data-type="input-update-color"]',
    );

    inputUpdateColor?.addEventListener('change', (e) => {
      const target = <HTMLInputElement>e.target;
      this.updColorValue = target.value;
    });
  }

  private listeners(): void {
    this.clickFormHandler();
    this.textInputHandler();
    this.colorInputHandler();
  }

  private createInputRow(type: 'create' | 'update'): HTMLDivElement {
    const inputsRow = document.createElement('div');
    inputsRow.classList.add('form__row');

    const button = new Button();
    const inputBtn = button.createBtn({
      textContent: type === 'update' ? 'Update' : 'Create',
      isDisabled: false,
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

  public printForm(): void {
    const garage = document.querySelector('.garage');
    garage?.append(this.createForm());
    this.listeners();
  }
}
