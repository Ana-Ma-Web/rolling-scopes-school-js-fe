export class Button {
  public createBtn(props: {
    datasetType: string;
    rootClass: string;
    modClass: string;
    textContent: string;
    isDisabled: boolean;
  }): HTMLButtonElement {
    const btn = document.createElement('button');
    const { datasetType, rootClass, modClass, textContent, isDisabled } = props;

    btn.dataset.btnType = datasetType;
    btn.classList.add(
      'btn',
      `${rootClass}__btn`,
      `${rootClass}__btn_${modClass}`,
    );
    btn.textContent = textContent;
    btn.disabled = isDisabled;

    return btn;
  }
}
