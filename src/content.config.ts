import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Jack Ronaldo Mintabae'),
    role: z.string().default('UI/UX Design Intern'),
    company: z.string().default('Tech Studio'),
    milestone: z.string().optional(), // e.g., "Bulan 01"
    tags: z.array(z.string()).default([]),
    ogImage: z.string().optional(),
    coverImage: z.string().optional(),
    readTime: z.string().default('5 min read'),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog };
