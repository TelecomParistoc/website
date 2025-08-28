"use client";

import Link from "next/link";
import { useState } from "react";
import LocaleSwitcher from "../LocaleSwitcher";
import { getDictionary } from "@/dictionaries";
import ThemeSwitcher from "../ThemeSwitcher";
import Image from "next/image";

const Header = ({ lang }: { lang: string }) => {
  // const params = useParams()
  // const lang = params?.lang || 'en'
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dict = getDictionary(lang);

  return (
    <header className="bg-background border-b border-foreground/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href={`/${lang}`} className="flex items-center">
              <Image
                src="/images/logo.svg"
                alt="Telecom Robotics Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
                priority
              />{" "}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href={`/${lang}`}
              className="text-foreground/70 hover:text-foreground"
            >
              {dict.navigation.home}
            </Link>
            <Link
              href={`/${lang}/about`}
              className="text-foreground/70 hover:text-foreground"
            >
              {dict.navigation.about}
            </Link>
            <Link
              href={`/${lang}/events`}
              className="text-foreground/70 hover:text-foreground"
            >
              {dict.navigation.events}
            </Link>
            <Link
              href={`/${lang}/contact`}
              className="text-foreground/70 hover:text-foreground"
            >
              {dict.navigation.contact}
            </Link>
            <LocaleSwitcher />
            <ThemeSwitcher />
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground/70 hover:text-foreground"
            >
              <span className="sr-only">Open menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-foreground/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href={`/${lang}`}
              className="block px-3 py-2 text-foreground/70 hover:text-foreground"
            >
              {dict.navigation.home}
            </Link>
            <Link
              href={`/${lang}/about`}
              className="block px-3 py-2 text-foreground/70 hover:text-foreground"
            >
              {dict.navigation.about}
            </Link>
            <Link
              href={`/${lang}/events`}
              className="block px-3 py-2 text-foreground/70 hover:text-foreground"
            >
              {dict.navigation.events}
            </Link>
            <Link
              href={`/${lang}/contact`}
              className="block px-3 py-2 text-foreground/70 hover:text-foreground"
            >
              {dict.navigation.contact}
            </Link>
            <div className="px-3 py-2 space-y-2">
              <LocaleSwitcher />
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
