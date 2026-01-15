"use client";

import { useState } from "react";
import { useTheme } from "next-themes";

const themes = {
    light: {
        name: "Light",
        icon: "☀️",
    },
    dark: {
        name: "Dark",
        icon: "🌙",
    },
    telecom: {
        name: "Telecom",
        icon: "🎓",
    },
    robotics: {
        name: "Robotics",
        icon: "🤖",
    },
} as const;

export default function ThemeSwitcher() {
    const { resolvedTheme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    console.log(resolvedTheme);

    const currentTheme = themes[(resolvedTheme || 'dark') as keyof typeof themes];

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 text-foreground/70 hover:text-foreground"
            >
                <span>{currentTheme?.icon || ""}</span>
                <span>{currentTheme?.name || ""}</span>
                <svg
                    className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""
                        }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-card rounded-md shadow-lg ring-1 ring-black/5 z-50">
                    {Object.entries(themes).map(([themeKey, { name, icon }]) => (
                        <button
                            key={themeKey}
                            onClick={() => {
                                setTheme(themeKey as keyof typeof themes);
                                setIsOpen(false);
                            }}
                            className={`block w-full text-left px-4 py-2 text-sm ${resolvedTheme === themeKey
                                ? "bg-muted text-foreground"
                                : "text-foreground/70 hover:bg-muted"
                                } flex items-center space-x-2`}
                        >
                            <span>{icon}</span>
                            <span>{name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
