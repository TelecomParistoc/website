import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import Header from '@/components/layout/Header';
import { getDictionary } from '@/dictionaries';
import { Providers } from '@/components/Providers'
import * as React from "react";

const geistSans = localFont({
    src: "../fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});

const geistMono = localFont({
    src: "../fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export async function generateMetadata({ params }: { params: Promise<{ lang: string }>; }): Promise<Metadata> {
    const { lang } = await params;
    const dict = getDictionary(lang);
    return {
        title: "Telecom Robotics",
        description: dict.hero.subtitle,
    }
}

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    return (
        <html>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Providers>
                    <Header lang={lang} />
                    {children}
                </Providers>
            </body>
        </html>
    )
}
