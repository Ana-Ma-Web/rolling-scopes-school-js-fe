import { Article, ErrorMessages } from '../../../types';
import './sources.css';

class Sources {
    private getElement = <T extends HTMLElement>(root: DocumentFragment, selector: string): T => {
        const element = root.querySelector<T>(selector);
        if (!element) {
            throw new Error(ErrorMessages.NoNewsItem);
        }
        return element;
    };

    public draw(data: Article[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');

        if (!sourceItemTemp) {
            throw new Error(ErrorMessages.NoSourcesTemplate);
        }

        data.forEach((item) => {
            const sourceClone = <DocumentFragment>sourceItemTemp.content.cloneNode(true);

            const sourceItemName = this.getElement<HTMLElement>(sourceClone, '.source__item-name');
            const sourceItem = this.getElement<HTMLElement>(sourceClone, '.source__item');

            sourceItemName.textContent = item.name;
            sourceItem.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        document.querySelector('.sources')?.append(fragment);
    }
}

export default Sources;
