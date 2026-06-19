import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const essays = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/essays' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.string(),
    tags: z.array(z.string()),
    description: z.string(),
    /**
     * public：公開列出並產生文章頁。
     * unlisted：只產生 noindex 文章頁，不進入任何列表或搜尋。
     * private：私人內容，不產生公開文章頁。
     * draft：尚未完成的草稿，不產生公開文章頁。
     */
    visibility: z.enum(['public', 'unlisted', 'private', 'draft']),
    featured: z.boolean(),
  }),
});

export const collections = { essays };
