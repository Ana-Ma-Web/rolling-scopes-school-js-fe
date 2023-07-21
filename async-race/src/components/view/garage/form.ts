import { capitalisation } from '../../../helpers/capitalisation';
import { CreateRacerProps, GetRacersData, Racer } from '../../../types';
import {
  createRacer,
  getRacers,
  updateRacer,
} from '../../controller/controller';
import { Button } from '../ui/button';

export class Form {
  private selectedId = 0;

  private newInputValue = 'Anonym';

  private updInputValue = 'Anonym';

  private newColorValue = '#7c7d83';

  private updColorValue = '#7c7d83';

  private updateGarageTracks: () => Promise<void>;

  constructor(updateGarageTracks: () => Promise<void>) {
    this.updateGarageTracks = updateGarageTracks;
  }

  public setSelectedId(id: number): void {
    this.selectedId = id;
    const selectBtn = <HTMLButtonElement>(
      document.querySelector('button[data-type="btn-update"]')
    );
    selectBtn.disabled = false;
  }

  public createNewRacer(): void {
    createRacer({
      color: this.newColorValue,
      name: this.newInputValue ? capitalisation(this.newInputValue) : 'Anonym',
    });
  }

  private updateSelectedRacer(): void {
    updateRacer({
      id: this.selectedId,
      color: this.updColorValue,
      name: this.updInputValue ? capitalisation(this.updInputValue) : 'Anonym',
    });
  }

  private clickFormHandler(): void {
    const form = document.querySelector('.form');
    form?.addEventListener('click', (e) => {
      const target = <HTMLElement>e.target;

      switch (target.dataset.type) {
        case 'btn-create':
          e.preventDefault();
          this.createNewRacer();
          this.updateGarageTracks();
          break;
        case 'btn-update':
          e.preventDefault();
          this.updateSelectedRacer();
          this.updateGarageTracks();
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
      this.updatePreview();
    });
    inputCreateColor?.addEventListener('change', (e) => {
      const target = <HTMLInputElement>e.target;
      this.newColorValue = target.value;
      this.updatePreview();
    });
    inputUpdateName?.addEventListener('change', (e) => {
      const target = <HTMLInputElement>e.target;
      this.updInputValue = target.value;
      this.updatePreview();
    });
    inputUpdateColor?.addEventListener('change', (e) => {
      const target = <HTMLInputElement>e.target;
      this.updColorValue = target.value;
      this.updatePreview();
    });
  }

  private listeners(): void {
    this.clickFormHandler();
    this.InputsHandler();
  }

  private createPreview(type: 'create' | 'update'): HTMLElement {
    const preview = document.createElement('div');
    preview.classList.add('form__preview', `form__preview_${type}`);
    const racer = document.createElement('div');
    racer.classList.add(`form__preview-racer_${type}`, 'racer');
    const name = document.createElement('div');
    name.classList.add(`form__preview-name_${type}`, 'name');

    preview.append(racer, name);
    return preview;
  }

  private createInput(props: {
    type: 'text' | 'color';
    inputDatasetType: string;
    class: string;
  }): HTMLInputElement {
    const input = document.createElement('input');
    input.type = props.type;
    input.dataset.type = props.inputDatasetType;
    input.classList.add('input', `input-${props.type}`, props.class);
    input.value = props.type === 'text' ? '' : '#7c7d83';
    input.placeholder = props.type === 'text' ? 'Name' : input.placeholder;

    return input;
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
      this.createInput({
        type: 'text',
        inputDatasetType: `input-${type}-name`,
        class: `form__input_${type}-name`,
      }),
      this.createInput({
        type: 'color',
        inputDatasetType: `input-${type}-color`,
        class: `form__input_${type}-color`,
      }),
      inputBtn,
      this.createPreview(type),
    );

    return inputsRow;
  }

  private updatePreview(): void {
    const newRacer = <HTMLElement>(
      document.querySelector('.form__preview-racer_create')
    );
    const newName = <HTMLElement>(
      document.querySelector('.form__preview-name_create')
    );
    const updRacer = <HTMLElement>(
      document.querySelector('.form__preview-racer_update')
    );
    const updName = <HTMLElement>(
      document.querySelector('.form__preview-name_update')
    );

    if (!newRacer || !newName || !updRacer || !updName)
      throw new Error('Preview not found');

    newRacer.style.backgroundColor = this.newColorValue;
    newName.textContent = capitalisation(this.newInputValue);
    updRacer.style.backgroundColor = this.updColorValue;
    updName.textContent = capitalisation(this.updInputValue);
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
    this.updatePreview();
    this.listeners();
  }
}
