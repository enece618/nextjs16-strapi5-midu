import { STRAPI_BASE_URL } from "@/lib/strapi";
import Link from "next/link";

export default function HeroSection({ data }: {
    readonly data: {
        heading: string;
        subHeading: string;
        image: {
            url: string;
            alternativeText: string;
        };
        link: {
            href: string;
            label: string;
        };
    }
}) {
    if (!data) return null;

    const { heading, subHeading, image, link } = data;

    const imageURL = image.url.startsWith('http')
        ? image.url
        : `${STRAPI_BASE_URL}${image.url}`;

    return (
        <section className="relative bg-gray-900 text-white overflow-hidden">
            <div className="absolute inset-0">
                <img
                    src={imageURL}
                    alt="Background"
                    className="w-full h-full object-cover opacity-30"
                />
            </div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 flex flex-col items-center text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                    {heading}
                </h1>
                <p className="mt-4 max-w-2xl text-xl text-gray-300 mb-10">
                    {subHeading}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                        href={link.href}
                        className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-md font-medium transition-colors"
                    >
                        {link.label}
                    </Link>
                </div>
            </div>
        </section>
    );
}
