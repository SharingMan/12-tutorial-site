#!/usr/bin/env node
/**
 * 根据字数生成建议阅读时间（分钟），写入 static/readingTime.json
 * 算法：中文字符 + 英文词数，按 300 字/分钟 估算，至少 1 分钟
 */

const fs = require('fs');
const path = require('path');

const DOCS = path.join(__dirname, '..', 'docs');
const OUT = path.join(__dirname, '..', 'src', 'data', 'readingTime.json');
const CHARS_PER_MIN = 300;

function walk(dir, ext, list = []) {
  if (!fs.existsSync(dir)) return list;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, ext, list);
    else if (ext.test(name)) list.push(full);
  }
  return list;
}

function stripFrontmatter(s) {
  return s.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '');
}

function stripMarkdown(s) {
  return s
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#*_~`\[\]()]/g, ' ')
    .replace(/^[-+*]\s+/gm, ' ')
    .replace(/\n+/g, ' ');
}

function count(s) {
  const cjk = (s.match(/[\u4e00-\u9fa5]/g) || []).length;
  const en = s.replace(/[\u4e00-\u9fa5]/g, ' ').split(/\s+/).filter(Boolean).length;
  return cjk + en;
}

function toDocId(abs) {
  const base = path.relative(DOCS, abs);
  return base.replace(/\.(md|mdx)$/i, '').replace(/\\/g, '/');
}

const out = {};
for (const f of walk(DOCS, /\.(md|mdx)$/i)) {
  const docId = toDocId(f);
  const raw = fs.readFileSync(f, 'utf8');
  const text = stripMarkdown(stripFrontmatter(raw));
  const n = count(text);
  out[docId] = Math.max(1, Math.ceil(n / CHARS_PER_MIN));
}

const dir = path.dirname(OUT);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(out, null, 2), 'utf8');
console.log('[reading-time] wrote src/data/readingTime.json');
