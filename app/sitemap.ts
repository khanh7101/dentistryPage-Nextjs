import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://passiondental.com.vn';
    const locales = ['vi', 'en'];

    // List of your static routes
    const routes = [
        '',
        '/about',
        '/services',
        '/booking',
        '/diary',
        '/blog',
    ];

    const sitemapEntries: MetadataRoute.Sitemap = [];

    routes.forEach(route => {
        locales.forEach(locale => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}${route}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: route === '' ? 1 : 0.8,
            });
        });
    });

    return sitemapEntries;
}
