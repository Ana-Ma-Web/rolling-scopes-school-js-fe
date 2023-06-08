import { Article } from '../../../types';
import './news.css';

class News {
    private drawNewsClone(newsClone: Node, item: Article, idx: number): void {
        if (!(newsClone instanceof DocumentFragment) || !newsClone) {
            throw new Error();
        }
        const newsItem = newsClone.querySelector('.news__item');
        const newsMetaPhoto: HTMLElement | null = newsClone.querySelector('.news__meta-photo');
        const newsMetaAuthor = newsClone.querySelector('.news__meta-author');
        const newsMetaDate = newsClone.querySelector('.news__meta-date');
        const newsDescTitle = newsClone.querySelector('.news__description-title');
        const newsDescSource = newsClone.querySelector('.news__description-source');
        const newsDescContent = newsClone.querySelector('.news__description-content');
        const newsReadMoreLink = newsClone.querySelector('.news__read-more a');

        if (
            !newsItem ||
            !newsMetaPhoto ||
            !newsMetaAuthor ||
            !newsMetaDate ||
            !newsDescTitle ||
            !newsDescSource ||
            !newsDescContent ||
            !newsReadMoreLink
        ) {
            throw new Error();
        }

        if (idx % 2) newsItem.classList.add('alt');

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
            throw new Error();
        }

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp?.content.cloneNode(true);
            this.drawNewsClone(newsClone, item, idx);
            fragment.append(newsClone);
        });

        newsElement.innerHTML = '';
        newsElement.appendChild(fragment);
    }
}

export default News;
