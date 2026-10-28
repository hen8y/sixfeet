import { Head } from '@inertiajs/react';

export function PublicHead({
    title,
    description,
}: {
    title: string;
    description: string;
}) {
    return (
        <Head title={title}>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
                crossOrigin="anonymous"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&family=Poppins:wght@400;500;600;700&display=swap"
                rel="stylesheet"
            />
            <meta name="description" content={description} />
        </Head>
    );
}
