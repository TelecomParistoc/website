export default function MdxLayout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            <article className="prose prose-slate dark:prose-invert relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
                {children}
            </article>
        </section>
    );
}
