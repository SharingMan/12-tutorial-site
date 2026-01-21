#!/usr/bin/env node
/**
 * 修复 Notion 同步后的 MDX 问题
 * - 将单独一行的 {#锚点} 合并到上一行标题
 * 用法: node scripts/fix-notion-mdx.js
 */

const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '..', 'docs');

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const fp = path.join(dir, f);
    if (fs.statSync(fp).isDirectory()) walkDir(fp, callback);
    else if (/\.(md|mdx)$/.test(f)) callback(fp);
  }
}

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  
  // 1. 修复 MDX 锚点问题: 将单独一行的 {#锚点} 合并到上一行标题
  content = content.replace(/(^#{1,6}\s+.+)\n\s+\{(#[a-zA-Z0-9_-]+)\}\s*$/gm, '$1 {$2}');
  
  // 2. 移除 frontmatter 中的 slug 行（让 Docusaurus 使用文件名作为路径）
  // 匹配: slug: /xxx 或 slug: xxx（可能在不同位置）
  content = content.replace(/^slug:\s*\/?[^\n]+\n/m, '');
  
  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log('Fixed:', path.relative(docsDir, filePath));
  }
}

walkDir(docsDir, fixFile);
console.log('Done.');
