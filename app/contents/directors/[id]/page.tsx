import { notFound } from 'next/navigation';
import DirectorDetailClient from './DirectorDetailClient';
import { directorsData } from '@/app/data/directors';

type DirectorDetailPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export function generateStaticParams() {
    return Object.keys(directorsData).map((id) => ({ id }));
}

export const dynamicParams = false;

export default async function DirectorDetailPage({ params }: DirectorDetailPageProps) {
    const { id } = await params;
    const director = directorsData[id as keyof typeof directorsData];

    if (!director) {
        notFound();
    }

    return <DirectorDetailClient key={director.id} director={director} />;
}
