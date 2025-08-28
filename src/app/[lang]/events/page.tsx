import { Button } from "@/components/ui/button";
import { getDictionary } from "@/dictionaries";
import Image from "next/image";

export default async function Events({
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
            {dict.events.title}
          </h1>
          <p className="text-xl md:text-2xl text-secondary-foreground max-w-3xl">
            {dict.events.intro}
          </p>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12">
            {dict.events.upcoming.title}
          </h2>
          <div className="grid gap-8">
            {upcomingEvents.map((event, index) => (
              <div
                key={index}
                className="bg-secondary rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
              >
                <div className="md:grid md:grid-cols-3 md:gap-6">
                  <div className="relative h-64 md:h-full">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 md:col-span-2">
                    <div className="flex items-center mb-4 text-secondary-foreground">
                      <span className="font-semibold">{event.date}</span>
                      <span className="mx-2">•</span>
                      <span className="bg-secondary">{event.location}</span>
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-2">
                      {event.title}
                    </h3>
                    <p className="text-secondary-foreground mb-4">
                      {event.description}
                    </p>
                    <Button>{dict.events.registerButton}</Button>
                    {/* <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                                        </button> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12">
            {dict.events.past.title}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastEvents.map((event, index) => (
              <div
                key={index}
                className="bg-secondary rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
              >
                <div className="relative h-48">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <span className="text-secondary-foreground text-sm">
                      {event.date}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-2">
                    {event.title}
                  </h3>
                  <p className="text-secondary-foreground text-sm">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

const upcomingEvents = [
  {
    title: "Integration of new students",
    date: "September 2025",
    location: "Telecom Paris Campus",
    description:
      "Welcome event for new students to get acquainted with the Robotics association and its activities, through a small competition and the WEI.",
    image: "/images/wei.jpg",
  },
];

const pastEvents = [
  {
    title: "Robotics Competition",
    date: "April 20, 2024",
    location: "Paris Innovation Hub",
    description:
      "Annual robotics competition where teams showcase their innovative robots and compete in various challenges.",
    image: "/images/cup.jpg",
  },
  {
    title: "Robotics Workshop 2024",
    date: "March 15, 2024",
    location: "Telecom Paris Campus",
    description:
      "Join us for a hands-on workshop where you'll learn about the latest in robotics technology and get to build your own simple robot.",
    image: "/images/workshop.jpg",
  },
  {
    title: "AI in Robotics Seminar",
    date: "November 2023",
    description:
      "A seminar exploring the integration of AI in modern robotics applications.",
    image: "/events/seminar.jpg",
  },
  {
    title: "Robot Showcase 2023",
    date: "October 2023",
    description:
      "Public demonstration of student projects and robotics innovations.",
    image: "/events/showcase.jpg",
  },
  {
    title: "Industry Partnership Day",
    date: "September 2023",
    description:
      "Networking event with leading robotics companies and industry experts.",
    image: "/events/industry.jpg",
  },
];
