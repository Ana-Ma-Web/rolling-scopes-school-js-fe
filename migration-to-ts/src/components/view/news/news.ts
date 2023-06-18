import { Article, ErrorMessages } from '../../../types';
import './news.css';

class News {
    private getElement = <T extends HTMLElement>(root: DocumentFragment, selector: string): T => {
        const element = root.querySelector<T>(selector);
        if (!element) {
            throw new Error(ErrorMessages.NoNewsItem);
        }
        return element;
    };

    private drawNewsClone(newsClone: DocumentFragment, item: Article): void {
        const newsMetaPhoto = this.getElement<HTMLElement>(newsClone, '.news__meta-photo');
        const newsMetaAuthor = this.getElement<HTMLElement>(newsClone, '.news__meta-author');
        const newsMetaDate = this.getElement<HTMLElement>(newsClone, '.news__meta-date');
        const newsDescTitle = this.getElement<HTMLElement>(newsClone, '.news__description-title');
        const newsDescSource = this.getElement<HTMLElement>(newsClone, '.news__description-source');
        const newsDescContent = this.getElement<HTMLElement>(newsClone, '.news__description-content');
        const newsReadMoreLink = this.getElement<HTMLElement>(newsClone, '.news__read-more a');

        newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
        newsMetaAuthor.textContent = item.author || item.source.name;
        newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
        newsDescTitle.textContent = item.title;
        newsDescSource.textContent = item.source.name;
        newsDescContent.textContent = item.description;
        newsReadMoreLink.setAttribute('href', item.url);
    }

    public draw(data: Article[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx: number) => idx < 10) : data;
        const fragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');
        const newsElement = document.querySelector('.news');

        if (!newsItemTemp || !newsElement) {
            throw new Error(ErrorMessages.NoNewsTemplate);
        }

        news.forEach((item) => {
            const newsClone = <DocumentFragment>newsItemTemp?.content.cloneNode(true);
            this.drawNewsClone(newsClone, item);
            fragment.append(newsClone);
        });

        newsElement.innerHTML = '';
        newsElement.appendChild(fragment);
    }
}

export default News;
