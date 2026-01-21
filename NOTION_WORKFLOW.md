# 做法一：在 Notion 写文章 → 同步到教程

## 流程

```
在 Notion Outline 下写 / 改文章
        ↓
运行同步（或自动监听）
        ↓
自动修复 MDX 格式（可选）
        ↓
教程站点更新
```

## 1. 在 Notion 里写

- 打开你的 **Outline** 页面
- 在下面**新建页面**或**编辑已有页面**
- 正常写正文、加图片、表格等
- 保存（Notion 会自动保存）

## 2. 同步到本地

**手动同步：**

```bash
npm run sync:notion:npx
```

**同步并自动修复 MDX（推荐，避免标题旁 `{#...}` 单独占一行导致报错）：**

```bash
npm run sync:notion:full
```

**开发时开自动监听（每 5 分钟同步一次）：**

```bash
npm run watch:notion
```

## 3. 可选：只修 MDX，不重新拉 Notion

如果已经同步完，只想修格式：

```bash
npm run fix:notion-mdx
```

## 4. 在站点里看效果

- 本地：`npm start` 后访问 http://localhost:3000  
- 教程入口：顶栏「教程」→ 侧边栏「📝 Notion 同步文档」等

## 注意事项

- 同步会**覆盖** `docs/` 里来自 Notion 的页面；本地的 `ai-learning`、`tools` 等若被误删，需要自己再补或从 Git 恢复。
- Notion 的 **Outline** 下只放「链接到子页」或「子页面」，别在 Outline 这一层写长正文；正文写在**子页面**里。
- 尽量少用 `@-mention` 式链接，否则可能被 docu-notion 当成正文或导致页面被跳过。

## 常用命令

| 命令 | 作用 |
|------|------|
| `npm run sync:notion:npx` | 从 Notion 同步到 `docs/` |
| `npm run sync:notion:full` | 同步 + 修复 MDX |
| `npm run fix:notion-mdx` | 只修复 MDX |
| `npm run watch:notion` | 每 5 分钟自动同步 |
| `npm start` | 启动本地预览 |

---

总结：**在 Notion 写 → 运行 `sync:notion:full`（或 `sync:notion:npx` + `fix:notion-mdx`）→ 教程里就有了。**
