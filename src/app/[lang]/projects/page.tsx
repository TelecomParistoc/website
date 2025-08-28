import Image from 'next/image'
import { getDictionary } from '@/dictionaries'

export default async function Projects({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const {lang} = await params;
    const dict = getDictionary(lang)
    const projects = dict.featuredProjects

    return (
        <main className="min-h-screen relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20em,var(--tw-gradient-from)_0%,var(--tw-gradient-to)_100%)] from-primary/40 to-transparent opacity-50 -z-10" />

            {/* Hero Section */}
            <section className="relative h-[60vh]">
                <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
                    <h1 className="text-5xl md:text-7xl font-bold text-primary mb-6">
                        {dict.projects.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-secondary-foreground max-w-3xl">
                        Discover our innovative robotics projects and their impact.
                    </p>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-12">
                        {projects.map((project, index) => (
                            <div
                                key={index}
                                className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="md:grid md:grid-cols-2 gap-8">
                                    <div className="relative h-72 md:h-full">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="p-8">
                                        <h2 className="text-2xl font-bold text-primary mb-4">
                                            {project.title}
                                        </h2>
                                        <p className="text-card-foreground/80 mb-6">
                                            {project.details.overview}
                                        </p>

                                        <div className="bg-secondary/50 rounded-lg p-6">
                                            <h3 className="font-semibold text-primary mb-4">Key Features:</h3>
                                            <ul className="space-y-2">
                                                {project.details.features.map((feature, featureIndex) => (
                                                    <li
                                                        key={featureIndex}
                                                        className="flex items-center gap-2 text-card-foreground/80"
                                                    >
                                                        <span className="text-primary">•</span>
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="mt-6 flex items-center justify-between text-sm text-card-foreground/70">
                                            <div>
                                                <span className="text-primary font-medium">Status: </span>
                                                {project.details.status}
                                            </div>
                                            {project.details.team && (
                                                <div>{project.details.team}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
} 