import Link from 'next/link';
import { getDictionary } from '@/dictionaries'
import { Button } from "@/components/ui/button"
import ScrollShapes from '@/components/ScrollShapes';
import FeaturedProjects from '@/components/FeaturedProjects';

export default async function Home({
    params
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params || { lang: "en" };
    const dict = getDictionary(lang);

    const projects = dict.featuredProjects;

    const benefits = dict.benefits;

    return (
        <main className="min-h-screen relative overflow-hidden">
            <ScrollShapes />
            <section className="relative h-[85vh]">
                <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
                    <h1 className="text-5xl md:text-7xl font-bold text-secondary-foreground mb-6">
                        {dict.hero.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-secondary-foreground/80 max-w-3xl mb-10">
                        {dict.hero.subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                            asChild
                            className="px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300"
                        >
                            <Link href="/projects">
                                {dict.hero.cta.projects}
                            </Link>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            className="px-8 py-3 bg-transparent border-2 border-secondary-foreground text-secondary-foreground hover:text-secondary transition-all duration-300"
                        >
                            <Link href="/join">
                                {dict.hero.cta.join}
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            <FeaturedProjects dict={dict} projects={projects} />
            
            {/* Why Join Us Section */}
            <section className="py-20 relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,var(--primary)/5,transparent)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_0%_-100px,var(--accent)/5,transparent)]" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-foreground mb-4">
                            {dict.join.title}
                        </h2>
                        <p className="text-xl text-foreground/70 max-w-3xl">
                            {dict.join.subtitle}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="p-6 bg-card rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                            >
                                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                                    {benefit.title}
                                </h3>
                                <p className="text-card-foreground/70">
                                    {benefit.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}