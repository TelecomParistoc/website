import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ['selector', '[data-mode="dark"]'],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                border: 'hsl(var(--border))',
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))'
                }
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            backgroundImage: {
                'radial-gradient': 'radial-gradient(circle at center, var(--tw-gradient-from) 0%, var(--tw-gradient-to) 100%)',
            },
            keyframes: {
                "zoom-in-95": {
                    "0%": {
                        opacity: "0",
                        transform: "translate(-50%, -50%) scale(0.3)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translate(-50%, -50%) scale(1)",
                    }
                },
                "modal-in": {
                    "0%": {
                        opacity: "0",
                        transform: "translate(calc(var(--origin-x) - 50%), calc(var(--origin-y) - 50%)) scale(0.5)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translate(-50%, -50%) scale(1)",
                    }
                }
            },
            animation: {
                "zoom-in-95": "zoom-in-95 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                "modal-in": "modal-in 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
            }
        }
    },
    plugins: [
        require("tailwindcss-animate"),
        require("@tailwindcss/typography"),
    ],
};

export default config;
