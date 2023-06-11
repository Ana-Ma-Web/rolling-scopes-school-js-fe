import { DataType } from '../../types';
import AppLoader from './appLoader';

class AppController extends AppLoader {
    public getSources(callback: (data?: DataType) => void): void {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    public getNews(e: Event, callback: (data?: DataType) => void): void {
        let { target } = e;
        const newsContainer = e.currentTarget;
        document.querySelector('body')?.classList.add('hide-sources');

        while (target instanceof HTMLElement && target !== newsContainer && newsContainer instanceof HTMLElement) {
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
            target = target.parentNode;
        }
    }
}

export default AppController;
