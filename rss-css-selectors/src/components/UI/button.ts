export class Button {
  public createResetButton(rootClass: string): HTMLButtonElement {
    const button = document.createElement('button');
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
    button.textContent = 'Help';
    button.classList.add(`${rootClass}__btn`, `${rootClass}__btn_help`, 'btn');

    return button;
  }

  public createEnterButton(rootClass: string): HTMLButtonElement {
    const button = document.createElement('button');
    button.textContent = 'Enter';
    button.classList.add(`${rootClass}__btn`, `${rootClass}__btn_enter`, 'btn');

    return button;
  }

  public createOkayButton(rootClass: string): HTMLButtonElement {
    const button = document.createElement('button');
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
