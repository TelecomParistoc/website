import { getDictionary } from "@/dictionaries";

export default async function Join({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  return (
    <main className="min-h-screen relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20em,var(--tw-gradient-from)_0%,var(--tw-gradient-to)_100%)] from-primary/40 to-transparent opacity-50 -z-10" />
      {/* Hero Section */}
      <section className="relative h-[60vh]">
        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <h1 className="text-5xl md:text-7xl font-bold text-primary mb-6">
            {dict.join.title}
          </h1>
          <p className="text-xl md:text-2xl text-secondary-foreground max-w-3xl">
            {dict.join.intro}
          </p>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12">
            {dict.join.opportunities.title}
          </h2>
          <div className="space-y-12">
            {dict.join.opportunities.list.map((opportunity, index) => (
              <div
                key={index}
                className="bg-secondary rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <h3 className="text-xl font-bold text-primary mb-2">
                  {opportunity.role}
                </h3>
                <p className="text-secondary-foreground mb-4">
                  {opportunity.description}
                </p>
                <a
                  href={opportunity.applyLink}
                  className="text-primary font-semibold hover:underline"
                >
                  {dict.join.opportunities.applyButton}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
