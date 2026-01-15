import type { NextConfig } from "next";
import createMDX from '@next/mdx'
import rehypePrettyCode from "rehype-pretty-code";

const nextConfig: NextConfig = {
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
    options: {
        rehypePlugins: [['rehype-pretty-code', { theme: "github-dark" }]],
    },
})

export default withMDX(nextConfig);
