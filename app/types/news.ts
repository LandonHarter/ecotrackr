export type ArticleSource = {
    id: any;
    name: string;
};

export type Article = {
    source: ArticleSource;
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
};

export type NewsResponse = {
    status: 'ok' | 'error';
    totalResults: number;
    articles: Article[];
}