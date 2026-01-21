# ⚠️ Notion 同步重要提示

## 重要警告

`docu-notion` 在同步时会**清空输出目录**（`docs/`），这意味着：

- ✅ 会同步 Notion 中的新内容
- ❌ **会删除** `docs/` 目录中所有不在 Notion 中的文件

## 📋 当前状态

你的 Notion 文档已成功同步：
- ✅ `iTab与genspark.md` - 已同步
- ✅ 4 张图片 - 已下载

## 🔧 解决方案

### 方案一：将 Notion 文档放在单独目录（推荐）

修改同步命令，将 Notion 文档同步到单独目录：

```bash
# 同步到 docs/notion/ 目录
npx @sillsdev/docu-notion \
  -n $NOTION_TOKEN \
  -r $NOTION_ROOT_PAGE_ID \
  -m ./docs/notion
```

然后在 `sidebars.ts` 中配置：

```typescript
{
  type: 'category',
  label: '📝 Notion 同步文档',
  items: [
    'notion/iTab与genspark',
  ],
}
```

### 方案二：所有文档都在 Notion 中管理

如果你希望所有文档都在 Notion 中管理：

1. 在 Notion 的 `Outline` 页面下创建所有文档
2. 删除本地的 `docs/ai-learning/` 和 `docs/tools/` 目录
3. 直接使用同步命令同步所有内容

### 方案三：使用 Git 备份（推荐用于生产环境）

在同步前先提交到 Git：

```bash
# 1. 提交当前更改
git add docs/
git commit -m "备份文档"

# 2. 运行同步
npm run sync:notion:npx

# 3. 检查更改
git diff docs/

# 4. 如果需要恢复
git checkout docs/
```

## 📝 当前配置

你的 `.env` 文件已配置好：
- ✅ `NOTION_TOKEN` - 已设置
- ✅ `NOTION_ROOT_PAGE_ID` - 已设置

## 🚀 使用建议

### 日常使用流程：

1. **在 Notion 中编写/更新文档**
2. **运行同步命令**：
   ```bash
   npm run sync:notion:npx
   ```
3. **检查同步结果**：
   ```bash
   ls -la docs/
   ```
4. **启动开发服务器查看**：
   ```bash
   npm start
   ```

### 自动化同步（GitHub Actions）

如果你使用 GitHub，可以设置自动同步：
- 每 6 小时自动同步一次
- 自动提交更改
- 自动构建和部署

配置已准备好：`.github/workflows/sync-notion.yml`

## 💡 最佳实践

1. **定期备份** - 使用 Git 版本控制
2. **测试同步** - 先用测试目录测试
3. **检查内容** - 同步后检查文件是否正确
4. **更新侧边栏** - 同步后更新 `sidebars.ts`

## 🔍 当前文档结构

```
docs/
├── iTab与genspark.md          # ← Notion 同步的文档
├── *.png                       # ← Notion 同步的图片
├── ai-learning/               # ← 本地文档
│   ├── intro.md
│   ├── basics.mdx
│   ├── machine-learning.md
│   └── deep-learning.md
└── tools/                      # ← 本地文档
    ├── intro.md
    ├── git.md
    ├── vscode.md
    └── docker.md
```

---

**提示**: 下次同步前，建议先备份或提交到 Git！
