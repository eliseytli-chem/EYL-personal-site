import { defineConfig } from 'astro/config';

const [githubOwner, githubRepository] = (process.env.GITHUB_REPOSITORY ?? '').split('/');
const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === 'true' && githubOwner && githubRepository;
const isUserOrOrganizationSite = githubRepository === `${githubOwner}.github.io`;

export default defineConfig({
  output: 'static',
  // GitHub Project Pages 位於 /repository/；使用者或組織首頁則位於根目錄。
  site: isGitHubPagesBuild ? `https://${githubOwner}.github.io` : 'http://localhost:4321',
  base: isGitHubPagesBuild && !isUserOrOrganizationSite ? `/${githubRepository}` : '/',
});
