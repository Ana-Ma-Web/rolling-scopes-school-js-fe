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

type EndPoint = {
    endpoint: string;
};

export type GetRespType = EndPoint & { options: Options };
