# 一頁之間

以 Astro 建立的繁體中文個人作家網站，文章使用 Markdown 管理，並部署至 GitHub Pages。

## 本機需求

- Node.js 24（Astro 6 至少需要 Node.js 22.12）
- pnpm 11

若尚未啟用 pnpm，可使用 Node.js 內附的 Corepack：

```bash
corepack enable
corepack prepare pnpm@11 --activate
```

## 本機安裝

```bash
pnpm install
```

## 本機開發與預覽

啟動開發伺服器：

```bash
pnpm dev
```

開啟 `http://localhost:4321`。

預覽正式建置結果：

```bash
pnpm build
pnpm preview
```

`pnpm build` 執行 `astro build`，輸出資料夾是 `dist/`。

## 新增文章

1. 複製 `templates/essay-template.md`。
2. 將副本放進 `src/content/essays/`。
3. 使用穩定的英文檔名，例如 `reading-with-children.md`；檔名會成為文章 slug。
4. 填妥所有 frontmatter 欄位並撰寫正文。
5. 寫作期間保留 `visibility: draft`；確認公開時改為 `visibility: public`。
6. 執行 `pnpm check` 與 `pnpm build`，確認 metadata 與網站建置正常。

visibility 規則：

- `public`：公開並出現在列表與搜尋。
- `unlisted`：只有知道網址的人可以閱讀，不進入列表與搜尋。
- `private`：不產生公開頁面。
- `draft`：不產生公開頁面。

## 推送到 GitHub

先在 GitHub 建立 repository，再於專案目錄執行：

```bash
git init
git add .
git commit -m "Initialize Astro writer site"
git branch -M main
git remote add origin https://github.com/你的帳號/你的repository名稱.git
git push -u origin main
```

之後每次更新：

```bash
git add .
git commit -m "Update site"
git push
```

推送到 `main` 後，`.github/workflows/deploy.yml` 會自動安裝依賴、執行 `pnpm run build`，將 `dist/` 發布至 GitHub Pages。

## 啟用 GitHub Pages

1. 進入 GitHub repository。
2. 開啟 **Settings → Pages**。
3. 在 **Build and deployment** 的 **Source** 選擇 **GitHub Actions**。
4. 推送一次 `main`，或前往 **Actions → Deploy to GitHub Pages → Run workflow** 手動執行。

不需要建立 `gh-pages` 分支，也不需要 Netlify 或其他第三方部署服務。

## `site` 與 `base`

GitHub Pages 有兩種常見網址：

- 使用者／組織網站：`https://帳號.github.io/`，repository 必須命名為 `帳號.github.io`，不需要額外 `base`。
- Project Pages：`https://帳號.github.io/repository名稱/`，必須設定 `base: /repository名稱`。

`astro.config.mjs` 已在 GitHub Actions 中讀取 `GITHUB_REPOSITORY` 並自動判斷：Project Pages 使用 repository 名稱作為 base；使用者／組織網站使用 `/`。站內連結也統一透過 `src/lib/urls.ts` 加上正確 base，因此不需要手動修改帳號或 repository 名稱。

## 確認部署成功

1. 前往 repository 的 **Actions**。
2. 確認最新的 **Deploy to GitHub Pages** workflow 顯示綠色勾號。
3. 點入 workflow 的 `deploy` job，可從 deployment URL 開啟網站。
4. 也可回到 **Settings → Pages** 查看目前公開網址。
5. 開啟首頁後，再點擊文章、分類、標籤與搜尋，確認 Project Pages 子路徑均正常。

若 workflow 成功但網站仍顯示舊內容，可稍候一至兩分鐘再重新整理。
