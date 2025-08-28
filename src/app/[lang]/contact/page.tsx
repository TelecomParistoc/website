"use client"

import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { getDictionary } from '@/dictionaries'
import { Button } from "@/components/ui/button"
import { useScrollPosition } from '@/hooks/useScrollPosition'

export default function Contact() {
    const pathname = usePathname()
    const lang = pathname.split('/')[1] || 'en'
    const dict = getDictionary(lang)

    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const [emailError, setEmailError] = useState('');

    const [nameError, setNameError] = useState('');

    const scrollY = useScrollPosition()

    const validateEmail = (email: string) => {
        if (!email) {
            setEmailError('Email is required');
            return false;
        }
        if (!emailPattern.test(email)) {
            setEmailError('Please enter a valid email address');
            return false;
        }
        setEmailError('');
        return true;
    };

    const validateName = (name: string) => {
        if (!name || name.trim().length === 0) {
            setNameError('Name is required');
            return false;
        }
        if (name.trim().length < 2) {
            setNameError('Name must be at least 2 characters long');
            return false;
        }
        setNameError('');
        return true;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)

        const formData = new FormData(e.currentTarget)
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        
        const isNameValid = validateName(name);
        const isEmailValid = validateEmail(email);

        if (!isNameValid || !isEmailValid) {
            setIsSubmitting(false);
            return;
        }

        const data = {
            name,
            email,
            message: formData.get('message'),
        }

        try {
            window.location.href = `mailto:${dict.contact.email}?subject=Contact from ${data.name}&body=${data.message}`
            setStatus('success')
            ;(e.target as HTMLFormElement).reset()
        } catch {
            setStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <main className="min-h-screen relative overflow-hidden">
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div 
                    className="absolute w-72 h-72 bg-primary/30 rounded-full blur-3xl transition-transform duration-300 ease-out"
                    style={{
                        top: '20%',
                        left: '-5rem',
                        transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.05}px)`
                    }}
                />
                <div 
                    className="absolute w-64 h-64 bg-accent/20 rounded-3xl rotate-12 blur-2xl transition-transform duration-300 ease-out"
                    style={{
                        top: '60%',
                        right: '10%',
                        transform: `translate(${scrollY * -0.08}px, ${scrollY * 0.06}px) rotate(${12 + scrollY * 0.02}deg)`
                    }}
                />
                <div 
                    className="absolute w-96 h-48 bg-secondary/20 rounded-[3rem] -rotate-6 blur-2xl transition-transform duration-300 ease-out"
                    style={{
                        top: '30%',
                        right: '20%',
                        transform: `translate(${scrollY * -0.05}px, ${scrollY * 0.08}px) rotate(${-6 + scrollY * -0.01}deg)`
                    }}
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20em,var(--tw-gradient-from)_0%,var(--tw-gradient-to)_100%)] from-primary/40 to-transparent opacity-50" />
            </div>
            <section className="relative h-[60vh]">
                <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
                    <h1 className="text-5xl md:text-7xl font-bold text-secondary-foreground mb-6">
                        {dict.contact.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-secondary-foreground/80 max-w-3xl mb-10">
                        {dict.contact.intro}
                    </p>
                </div>
            </section>

            <section className="py-12 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="max-w-2xl mx-auto backdrop-blur-xl bg-background/30 rounded-2xl shadow-lg border border-foreground/10">
                        <div className="p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-base font-medium text-foreground mb-2">
                                        {dict.contact.form.name}
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        required
                                        minLength={2}
                                        placeholder="John Doe"
                                        onChange={(e) => validateName(e.target.value)}
                                        className="block w-full rounded-xl border border-foreground/10 bg-background/50 text-foreground p-4
                                        focus:border-primary focus:ring-primary hover:border-foreground/20 transition-colors duration-200
                                        placeholder:text-foreground/50"
                                    />
                                    {nameError && (
                                        <p className="mt-2 text-sm font-medium bg-destructive/15 text-destructive-foreground/90 p-2 rounded-lg border border-destructive/25">
                                            {nameError}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-base font-medium text-foreground mb-2">
                                        {dict.contact.form.email}
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        required
                                        placeholder="john.doe@example.com"
                                        pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                                        onChange={(e) => validateEmail(e.target.value)}
                                        className="block w-full rounded-xl border border-foreground/10 bg-background/50 text-foreground p-4
                                        focus:border-primary focus:ring-primary hover:border-foreground/20 transition-colors duration-200
                                        placeholder:text-foreground/50"
                                    />
                                    {emailError && (
                                        <p className="mt-2 text-sm font-medium bg-destructive/15 text-destructive-foreground/90 p-2 rounded-lg border border-destructive/25">
                                            {emailError}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-base font-medium text-foreground mb-2">
                                        {dict.contact.form.message}
                                    </label>
                                    <textarea
                                        name="message"
                                        id="message"
                                        rows={6}
                                        required
                                        placeholder="Your message here..."
                                        className="block w-full rounded-xl border border-foreground/10 bg-background/50 text-foreground p-4
                                        focus:border-primary focus:ring-primary hover:border-foreground/20 transition-colors duration-200
                                        placeholder:text-foreground/50"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-6 text-lg font-medium bg-primary/90 hover:bg-primary"
                                >
                                    {isSubmitting ? 'Sending...' : dict.contact.form.submit}
                                </Button>

                                {status === 'success' && (
                                    <div className="rounded-xl bg-accent/10 p-4 border border-accent/20">
                                        <p className="text-accent-foreground text-base font-medium">
                                            {dict.contact.form.success}
                                        </p>
                                    </div>
                                )}

                                {status === 'error' && (
                                    <div className="rounded-xl bg-destructive/15 p-4 border border-destructive/25">
                                        <p className="text-destructive-foreground/90 text-base font-medium">
                                            {dict.contact.form.error}
                                        </p>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
} 