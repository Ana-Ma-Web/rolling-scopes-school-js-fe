export class Button {
  public createResetButton(rootClass: string): HTMLButtonElement {
    const button = document.createElement('button');
    button.dataset.type = 'reset';
    button.textContent = 'Reset';
    button.classList.add(
      `${rootClass}__btn`,
      `${rootClass}__btn_reset`,
      'btn_reset',
      'btn',
    );

    return button;
  }

  public createHelpButton(rootClass: string): HTMLButtonElement {
    const button = document.createElement('button');
    button.dataset.type = 'help';
    button.textContent = 'Help';
    button.classList.add(`${rootClass}__btn`, `${rootClass}__btn_help`, 'btn');

    return button;
  }

  public createEnterButton(rootClass: string): HTMLButtonElement {
    const button = document.createElement('button');
    button.dataset.type = 'enter';
    button.textContent = 'Enter';
    button.classList.add(`${rootClass}__btn`, `${rootClass}__btn_enter`, 'btn');

    return button;
  }

  public createOkayButton(rootClass: string): HTMLButtonElement {
    const button = document.createElement('button');
    button.dataset.type = 'okay';
    button.textContent = 'Okay';
    button.classList.add(
      `${rootClass}__btn`,
      `${rootClass}__btn_okay`,
      'btn_okay',
      'btn',
    );

    return button;
  }
}
