// This file is used to define the content collections for the Astro project. 
// It uses the `defineCollection` function from the `astro:content` module to create a collection of articles. 
// The articles are loaded from Markdown files located in the `src/content/articles` directory, and their metadata is validated using the `zod` library. 
// The schema specifies that each article must have a title, description, category, and order, with optional updated date and products array. 
// The default order is set to 99, and the products array defaults to an empty array if not provided.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    order: z.number().default(99),
    updated: z.coerce.date().optional(),
    products: z.array(z.string()).default([]),
  }),
});

export const collections = { articles };