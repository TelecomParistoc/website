import { getDictionary } from '@/dictionaries'
import Image from 'next/image'

export default async function About({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dict = getDictionary(lang);

    return (
        <main className="min-h-screen relative">
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20em,var(--tw-gradient-from)_0%,var(--tw-gradient-to)_100%)] from-primary/40 to-transparent  opacity-50" />
            </div>
            {/* Hero Section */}
            <section className="relative h-[60vh]">
                <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
                    <h1 className="text-5xl md:text-7xl font-bold text-primary mb-6">
                        {dict.about.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-secondary-foreground max-w-3xl">
                        {dict.about.intro}
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-primary mb-6">
                                {dict.about.mission.title}
                            </h2>
                            <p className="text-xl text-foreground/80">
                                {dict.about.mission.description}
                            </p>
                        </div>
                        <div className="mt-10 lg:mt-0 relative aspect-video">
                            <Image
                                src="/images/team.jpg"
                                alt="Robotics team working"
                                fill
                                className="object-cover rounded-xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,var(--primary)/5,transparent)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_0%_-100px,var(--accent)/5,transparent)]" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <h2 className="text-3xl font-bold text-primary mb-12">
                        {dict.about.values.title}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {dict.about.values.items.map((value, index) => (
                            <div
                                key={index}
                                className="p-6 bg-card rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-card-foreground mb-3">
                                    {value.title}
                                </h3>
                                <p className="text-card-foreground/90">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
} 