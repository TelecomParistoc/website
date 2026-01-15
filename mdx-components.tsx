import type { MDXComponents } from 'mdx/types'
import YouTube from '@/components/markdown/youtube'

const components = {
    YouTube
} satisfies MDXComponents

export function useMDXComponents(): MDXComponents {
    return components
}
