/**
 * 為站內路徑加上 Astro 的 base URL。
 * 本機會產生 /essays/；GitHub Project Pages 會產生 /repository/essays/。
 */
export function sitePath(path = '/') {
  const base = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  const relativePath = path.replace(/^\/+/, '');
  return `${base}${relativePath}`;
}
