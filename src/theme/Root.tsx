import React, {useEffect} from 'react';
import {useLocation} from '@docusaurus/router';

// 由 scripts/reading-time.js 生成，prestart 会先执行
import readingTimeData from '@site/src/data/readingTime.json';

const STORAGE_KEY = 'visitedDocs';
const PREV_DOC_KEY = 'currentDocPath'; // 用于追踪当前正在阅读的文档

const readingTimeMap = readingTimeData as Record<string, number>;

function normalizePath(path: string | null): string | null {
  if (!path) return null;
  return path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;
}

function toDocId(href: string | null): string {
  if (!href) return 'intro';
  const p = href.replace(/^\/docs\/?/, '').replace(/\/$/, '');
  return p || 'intro';
}

/** 仅获取左侧教程目录里的文档链接（排除 TOC 等） */
function getSidebarDocLinks(): HTMLAnchorElement[] {
  const selectors = [
    'aside .menu__link[href^="/docs/"]',
    '[class*="sidebar"] .menu__link[href^="/docs/"]',
    '[class*="Sidebar"] .menu__link[href^="/docs/"]',
  ].join(',');
  
  return Array.from(document.querySelectorAll<HTMLAnchorElement>(selectors)).filter(
    (a) => {
      const h = a.getAttribute('href');
      return h && !h.includes('#');
    }
  );
}

function addReadingTimeToSidebar(links: HTMLAnchorElement[]): void {
  links.forEach((link) => {
    if (link.querySelector('.menu__link-time')) return;
    const min = readingTimeMap[toDocId(link.getAttribute('href'))];
    if (min == null) return;
    const span = document.createElement('span');
    span.className = 'menu__link-time';
    span.textContent = ` ${min} min`;
    link.appendChild(span);
  });
}

/** 将路径标记为已读 */
function markAsRead(path: string): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const set = new Set<string>(raw ? JSON.parse(raw) : []);
    set.add(path);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
  } catch {
    // ignore
  }
}

/** 根据 localStorage 更新侧边栏的已读样式 */
function updateSidebarStyles(): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const visited = new Set<string>(raw ? JSON.parse(raw) : []);
    const links = getSidebarDocLinks();

    links.forEach((link) => {
      link.classList.remove('menu__link--visited');
      const href = normalizePath(link.getAttribute('href'));
      if (href && visited.has(href)) link.classList.add('menu__link--visited');
    });

    addReadingTimeToSidebar(links);
  } catch {
    // ignore
  }
}

export default function Root({children}: {children: React.ReactNode}): JSX.Element {
  const location = useLocation();

  useEffect(() => {
    const currentPath = normalizePath(location.pathname);
    const isDocPage = location.pathname.startsWith('/docs');

    // 获取上一个访问的文档路径
    const prevPath = sessionStorage.getItem(PREV_DOC_KEY);

    // 如果上一个页面是文档页面，且当前页面不同，则标记上一个为已读
    if (prevPath && prevPath !== currentPath) {
      markAsRead(prevPath);
    }

    // 更新当前文档路径
    if (isDocPage && currentPath) {
      sessionStorage.setItem(PREV_DOC_KEY, currentPath);
    } else {
      // 离开文档区域时，也标记上一个为已读
      if (prevPath) {
        markAsRead(prevPath);
      }
      sessionStorage.removeItem(PREV_DOC_KEY);
    }

    // 等侧边栏渲染后更新样式
    const t1 = setTimeout(updateSidebarStyles, 50);
    const t2 = setTimeout(updateSidebarStyles, 250);
    const t3 = setTimeout(updateSidebarStyles, 500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [location.pathname]);

  return <>{children}</>;
}
