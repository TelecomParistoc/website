"use client"

import Image from 'next/image';
import { Modal } from '@/components/ui/modal'
import { useState, useRef } from 'react';

type Project = {
  title: string
  description: string
  image: string
  details: {
    overview: string
    features: string[]
    status: string
    team: string
  }
}

type Dict = {
  projects: {
    title: string
    features: string
  }
}

export default function FeaturedProjects({ dict, projects }: { dict: Dict, projects: Project[] }) {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 })
    const cardRefs = useRef<Array<HTMLDivElement | null>>([])

    const setCardRef = (el: HTMLDivElement | null, index: number) => {
        cardRefs.current[index] = el
    }

    const handleProjectClick = (project: Project, index: number) => {
        const card = cardRefs.current[index]
        if (card) {
            const rect = card.getBoundingClientRect()
            setClickPosition({
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2
            })
        }
        setSelectedProject(project)
    }

    return (
        <>
            <section className="py-20 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <h2 className="text-3xl font-bold text-foreground mb-12">
                        {dict.projects.title}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {projects.map((project: Project, index: number) => (
                            <div
                                key={index}
                                ref={(el) => setCardRef(el, index)}
                                className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer bg-gradient-to-br from-card/80 to-card border border-foreground/5 hover:border-primary/30"
                                onClick={() => handleProjectClick(project, index)}
                            >
                                <div className="aspect-video relative overflow-hidden">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <div className="p-6 relative bg-gradient-to-t from-card via-card to-transparent">
                                    <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                                        {project.title}
                                    </h3>
                                    <p className="text-muted-foreground group-hover:text-foreground/90 transition-colors duration-300">
                                        {project.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Modal
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
                clickPosition={clickPosition}
            >
                {selectedProject && (
                    <div className="space-y-6">
                        <div className="aspect-video relative overflow-hidden rounded-lg">
                            <Image
                                src={selectedProject.image}
                                alt={selectedProject.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                            <h2 className="absolute bottom-6 left-6 text-3xl font-bold text-primary">
                                {selectedProject.title}
                            </h2>
                        </div>
                        
                        <p className="text-lg text-foreground/90">{selectedProject.details.overview}</p>

                        <div className="bg-card/50 rounded-lg p-6 border border-primary/20">
                            <h3 className="font-semibold text-primary mb-4">{dict.projects.features}</h3>
                            <ul className="grid gap-3">
                                {selectedProject.details.features.map((feature: string, index: number) => (
                                    <li key={index} className="flex gap-2 text-foreground/80">
                                        <span className="text-primary">•</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex justify-between items-center pt-6 border-t border-primary/10">
                            <div className="text-sm">
                                <strong className="text-primary">Status:</strong>{" "}
                                <span className="text-foreground/80">{selectedProject.details.status}</span>
                            </div>
                            <div className="text-sm text-foreground/80">
                                {selectedProject.details.team}
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    )
}