import { Metadata } from "next";

export default function basicMetadata(metadata?: Metadata): Metadata {
    return {
        metadataBase: new URL('https://ecotrackr.vercel.app'),
        title: metadata?.title || 'EcoTrackr',
        description: metadata?.description || 'Your partner in tracking, managing, and reducing carbon footprint with data-driven insights and a unified community comitted to saving the world.',
        authors: [
            {
                name: "Landon Harter",
                url: 'https://landonharter.me'
            },
            {
                name: "EcoTrackr",
                url: 'https://ecotrackr.vercel.app'
            },
        ],
        publisher: 'EcoTrackr',
        robots: {
            index: true,
            follow: true,
        },
        keywords: metadata?.keywords ? metadata?.keywords : 'EcoTrackr, carbon, ecosystem, global warming, emission',
        creator: 'EcoTrackr',
        icons: [
            {
                url: 'https://ecotrackr.vercel.app/images/icons/icon32.png',
                sizes: '32x32',
                type: 'image/png',
            },
            {
                url: 'https://ecotrackr.vercel.app/images/icons/icon64.png',
                sizes: '64x64',
                type: 'image/png',
            },
            {
                url: 'https://ecotrackr.vercel.app/images/icons/icon128.png',
                sizes: '128x128',
                type: 'image/png',
            },
            {
                url: 'https://ecotrackr.vercel.app/images/icons/icon256.png',
                sizes: '256x256',
                type: 'image/png',
            },
            {
                url: 'https://ecotrackr.vercel.app/images/icons/icon512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
        applicationName: 'EcoTrackr',
        openGraph: {
            title: metadata?.title || 'EcoTrackr',
            description: metadata?.description || 'Your partner in tracking, managing, and reducing carbon footprint with data-driven insights and a unified community comitted to saving the world.',
            url: `https://ecotrackr.vercel.app${metadata?.openGraph?.url || ''}`,
            type: 'website',
            images: ['https://ecotrackr.vercel.app/images/icons/icon512.png'],
            siteName: 'EcoTrackr',
        },
        twitter: {
            site: `https://ecotrackr.vercel.app${metadata?.openGraph?.url || ''}`,
            card: 'summary_large_image',
            images: ['https://ecotrackr.vercel.app/images/icons/icon512.png'],
            title: metadata?.title || 'EcoTrackr',
            description: metadata?.description || 'Your partner in tracking, managing, and reducing carbon footprint with data-driven insights and a unified community comitted to saving the world.',
        },
    } as Metadata;
}