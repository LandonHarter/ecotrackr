export type Article = {
    uuid: string;
    title: string;
    description: string;
    keywords: string;
    snippet: string;
    url: string;
    image_url: string;
    language: string;
    published_at: string;
    source: string;
    categories: string[];
    relevance_score: any;
    locale: string;
};

export type NewsResponseMeta = {
    found: number;
    returned: number;
    limit: number;
    page: number;
};

export type NewsResponse = {
    meta: NewsResponseMeta;
    data: Article[];
}