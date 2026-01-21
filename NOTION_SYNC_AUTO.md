# Notion 自动同步指南

## 📋 当前同步方式

### ❌ 不会自动同步

当你更新 Notion Outline 里的文章时，**不会自动同步**到 Docusaurus。需要手动运行同步命令。

## 🔄 同步方式

### 方式一：手动同步（最简单）

在 Notion 中更新文章后，运行：

```bash
npm run sync:notion:npx
```

或者：

```bash
npm run sync:notion
```

### 方式二：自动监听同步（开发时推荐）

启动自动监听，每 5 分钟自动同步一次：

```bash
npm run watch:notion
```

**使用场景**：
- 开发时保持内容最新
- 在 Notion 中频繁更新内容
- 需要实时查看最新内容

**注意**：这会持续运行，按 `Ctrl+C` 停止。

### 方式三：GitHub Actions 自动同步（生产环境推荐）

如果你使用 GitHub，可以设置自动同步：

1. **在 GitHub 仓库中添加 Secrets**：
   - `NOTION_TOKEN` - 你的 Notion Integration Token
   - `NOTION_ROOT_PAGE_ID` - 你的 Notion 页面 ID

2. **工作流会自动**：
   - 每 6 小时自动同步一次
   - 检测到 Notion 内容变化时自动提交
   - 自动构建和部署网站

3. **手动触发**：
   - 在 GitHub Actions 页面点击 "Run workflow" 可以立即同步

**配置文件**：`.github/workflows/sync-notion.yml`

## 🎯 推荐工作流程

### 开发时：

```bash
# 终端 1: 启动开发服务器
npm start

# 终端 2: 启动自动同步监听
npm run watch:notion
```

这样：
- ✅ 开发服务器会自动热重载
- ✅ Notion 内容每 5 分钟自动同步
- ✅ 修改后立即看到效果

### 生产环境：

1. **在 Notion 中更新内容**
2. **等待 GitHub Actions 自动同步**（最多 6 小时）
3. **或手动触发同步**（GitHub Actions → Run workflow）

## ⚙️ 调整同步频率

### 修改自动监听间隔

编辑 `scripts/watch-notion.sh`，修改这一行：

```bash
sleep 300  # 300 秒 = 5 分钟，可以改为其他值
```

例如：
- `sleep 60` - 每 1 分钟同步
- `sleep 600` - 每 10 分钟同步

### 修改 GitHub Actions 频率

编辑 `.github/workflows/sync-notion.yml`，修改这一行：

```yaml
schedule:
  - cron: '0 */6 * * *'  # 每 6 小时，可以改为其他值
```

Cron 格式说明：
- `0 */1 * * *` - 每小时
- `0 */3 * * *` - 每 3 小时
- `*/30 * * * *` - 每 30 分钟

## 🔍 检查同步状态

### 查看最后同步的文件

```bash
ls -lt docs/*.md | head -5
```

### 查看同步日志

运行同步命令时会显示：
- 找到的页面数量
- 同步的文件列表
- 错误信息（如果有）

## 💡 最佳实践

1. **开发时**：使用 `npm run watch:notion` 保持内容最新
2. **提交前**：手动运行一次 `npm run sync:notion:npx` 确保同步
3. **生产环境**：使用 GitHub Actions 自动同步
4. **重要更新**：可以手动触发 GitHub Actions 立即同步

## ⚠️ 注意事项

1. **同步会清空 docs 目录**：确保重要文件已备份或提交到 Git
2. **Notion API 限制**：频繁同步可能触发速率限制
3. **图片同步**：图片会下载到本地，确保有足够空间
4. **格式问题**：某些 Notion 格式可能需要手动调整

## 🚀 快速开始

### 立即同步一次：

```bash
npm run sync:notion:npx
```

### 启动自动监听：

```bash
npm run watch:notion
```

---

**提示**：建议在开发时使用自动监听，生产环境使用 GitHub Actions！
