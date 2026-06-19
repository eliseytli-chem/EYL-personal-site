import { getCollection, type CollectionEntry } from 'astro:content';
import { sitePath } from './urls';

export type Essay = CollectionEntry<'essays'>;

export const MAIN_CATEGORIES = [
  { name: '家庭閱讀', slug: 'family-reading', note: '一起讀過的書，以及書頁之外的對話。' },
  { name: '育兒札記', slug: 'parenting-notes', note: '陪伴孩子長大，也重新理解自己。' },
  { name: '教育思辨', slug: 'education', note: '關於學習、選擇與人的尺度。' },
  { name: '科學家的母職', slug: 'scientist-motherhood', note: '在研究、工作與照顧之間生活。' },
  { name: '文學散文', slug: 'literary-essays', note: '日常所見，與那些值得慢慢寫下的事。' },
] as const;

function newestFirst(a: Essay, b: Essay) {
  return b.data.date.valueOf() - a.data.date.valueOf();
}

/**
 * visibility 用途：
 * - public：一般公開文章，可出現在首頁、列表、分類、標籤、精選與搜尋。
 * - unlisted：知道網址即可閱讀，但不進入任何公開列表或搜尋，文章頁標示 noindex。
 * - private：私人保存，正式建置不產生文章路由。
 * - draft：尚未完成，正式建置不產生文章路由。
 */
export type EssayVisibility = Essay['data']['visibility'];

async function getEssaysByVisibility(allowed: readonly EssayVisibility[]) {
  const essays = await getCollection('essays', ({ data }) => allowed.includes(data.visibility));
  return essays.sort(newestFirst);
}

/** 所有公開曝光介面唯一應使用的文章來源。 */
export function getPublicEssays() {
  return getEssaysByVisibility(['public']);
}

/** 只供動態文章路由使用；絕對不可用於列表、搜尋、RSS 或 sitemap。 */
export async function getRoutableEssays() {
  return getEssaysByVisibility(['public', 'unlisted']);
}

export function essayPath(essay: Essay) {
  return sitePath(`/essays/${essay.id}/`);
}

export function categorySlug(category: string) {
  return MAIN_CATEGORIES.find(({ name }) => name === category)?.slug ?? encodeURIComponent(category);
}

export function categoryPath(category: string) {
  return sitePath(`/categories/${categorySlug(category)}/`);
}

export function tagPath(tag: string) {
  return sitePath(`/tags/${encodeURIComponent(tag)}/`);
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}
