'use client'

import CalandarSVG from "@/svg/calandar";
import { NewsResponse, Article } from "@/types/news";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function NewsPage() {
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        (async () => {
            if (articles.length > 0) return;
            const res = await getNewsArticles();
            console.log(res);
            return;
            setArticles(res.articles);
        })();
    }, []);

    function Story({ article }: { article: Article }) {
        if (!article.urlToImage) return <></>;
        return (
            <Link href={article.url} target='_blank' className='max-w-[450px] flex flex-col m-8'>
                <Image src={article.urlToImage} width={400} height={300} alt={article.title} className='rounded-xl mb-6 w-[400px] h-[250px]' />
                <h1 className='text-lg text-[hsl(var(--nextui-primary-500))] font-semibold mb-px'>NEWS STORY</h1>
                <h1 className='text-2xl font-bold mb-2 overflow-hidden whitespace-nowrap text-ellipsis'>{article.title}</h1>
                <p className='text-semibold text-gray-500  mb-4'>{article.description}</p>
            </Link>
        );
    }

    return (
        <div>
            <div className='w-full h-[60vh] flex flex-col items-center justify-center'>
                <h1 className='tracking-[0.65rem] text-[hsl(var(--nextui-primary-500))] font-semibold text-2xl mb-8'>NEWS</h1>
                <h1 className='text-7xl font-bold mb-8'>Recent Developments</h1>
                <p className='w-[900px] text-center text-3xl text-gray-400'>News, stories, and other developments regarding environmental issues.</p>
            </div>
            <div className='w-screen flex flex-wrap justify-center'>
                {articles.map((article, i) => <Story article={article} key={i} />)}
            </div>
        </div>
    );
};

async function getNewsArticles() {
    const search = 'pollution|climate%20change|global%20warming';
    const url = `https://newsapi.org/v2/everything?q=${search}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`;
    console.log(process.env.NEXT_PUBLIC_NEWS_API_KEY);
    const req = await fetch(url);
    const res = await req.json();
    return res as NewsResponse;
}