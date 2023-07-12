import { Data, TagType } from '../../types';
import './field.css';
import './field-popup.css';

export class Field {
  constructor(private data: Data) {
    this.data = data;
  }

  private createPlanet(
    tag: TagType,
    index: number,
    prevIndex?: number,
  ): HTMLElement {
    const name = tag.tagName;
    const { classes, shape, texture, isMove } = tag;

    const planet = document.createElement(name);
    if (classes) planet.classList.add(classes);
    planet.dataset.type = 'planet';
    planet.dataset.key = `p${
      name === 'planet' ? `${index}` : `${index}${prevIndex}`
    }`;
    planet.dataset.shape = String(shape);
    planet.dataset.move = String(isMove);
    planet.dataset.texture = String(texture);

    if (tag.innerTags !== null) {
      tag.innerTags?.forEach((e, i) => {
        planet.append(this.createPlanet(e, index, i + 1));
      });
    }
    return planet;
  }

  public updateField(): void {
    this.printField();
  }

  public printField(): void {
    const { activeLvl, levels } = this.data;
    const field = document.querySelector('.field');
    const fieldSpace = document.createElement('div');
    fieldSpace.classList.add('field__space');

    if (!field) throw new Error('No game field');

    field.innerHTML = '';

    levels[activeLvl - 1].table.forEach((e, i) => {
      fieldSpace.append(this.createPlanet(e, i + 1));
    });

    field.append(fieldSpace);
  }
}
