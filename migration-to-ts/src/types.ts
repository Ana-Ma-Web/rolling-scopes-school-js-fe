export interface Article {
    source: {
        id: string;
        name: string;
    };
    name: string;
    id: string;
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export interface Options {
    apiKey?: string;
    sources?: string;
}

export type GetRespType = {
    endpoint: string;
    options?: Options;
};

export interface DataType {
    articles: Article[];
    sources: Article[];
}

export enum ErrorMessages {
    NoCallbackForGet = 'No callback for GET response',
    NoNewsTemplate = 'News template not found',
    NoCloneNews = 'News clone error',
    NoNewsItem = 'News element not found',
    NoSourcesTemplate = 'Sources template not found',
    NoCloneSources = 'Sources clone error',
    NoSourcesItem = 'Sources element not found',
}
