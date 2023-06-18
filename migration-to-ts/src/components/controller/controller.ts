import { Callback, DataType } from '../../types';
import AppLoader from './appLoader';

class AppController extends AppLoader {
    public getSources(callback: Callback<DataType>): void {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    public getNews(e: Event, callback: Callback<DataType>): void {
        let target = <HTMLElement>e.target;
        const newsContainer = <HTMLElement>e.currentTarget;
        document.querySelector('body')?.classList.add('hide-sources');

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (newsContainer.getAttribute('data-source') !== sourceId && sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = <HTMLElement>target.parentNode;
        }
    }
}

export default AppController;
