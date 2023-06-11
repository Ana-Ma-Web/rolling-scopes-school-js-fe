import { Article, ErrorMessages } from '../../../types';
import './sources.css';

class Sources {
    public draw(data: Article[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');

        if (!sourceItemTemp) {
            throw new Error(ErrorMessages.NoSourcesTemplate);
        }

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true);

            if (!(sourceClone instanceof DocumentFragment) || !sourceClone) {
                throw new Error(ErrorMessages.NoCloneSources);
            }
            const sourceItemName = sourceClone.querySelector('.source__item-name');
            const sourceItem = sourceClone.querySelector('.source__item');

            if (!sourceItemName || !sourceItem) {
                throw new Error(ErrorMessages.NoSourcesItem);
            }

            sourceItemName.textContent = item.name;
            sourceItem.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        document.querySelector('.sources')?.append(fragment);
    }
}

export default Sources;
