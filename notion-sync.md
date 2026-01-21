# Notion 同步到 Docusaurus 指南

## 📋 概述

你可以使用 Notion 作为内容管理系统，然后自动同步到 Docusaurus。这样既能享受 Notion 的便捷写作体验，又能获得 Docusaurus 的强大文档功能。

## 🛠️ 推荐工具

### 1. docu-notion（最推荐）

**GitHub**: https://github.com/sillsdev/docu-notion

专为 Docusaurus 设计，功能最完善：
- ✅ 自动转换 Notion 页面为 Markdown
- ✅ 保留页面层级结构
- ✅ 支持 Notion 属性（status、tags 等）
- ✅ 自动下载图片到本地
- ✅ 支持 Git/CI 集成

### 2. notion2markdown

Python 工具，适合编程用户。

### 3. N2M（Notion to Markdown）

在线工具，适合偶尔导出。

## 🚀 使用 docu-notion 的步骤

### 步骤 1: 创建 Notion Integration

1. 访问 https://www.notion.so/my-integrations
2. 点击 "New integration"
3. 填写名称（如 "Docusaurus Sync"）
4. 选择工作区
5. 复制 **Internal Integration Token**

### 步骤 2: 分享 Notion 页面给 Integration

1. 打开你的 Notion 文档页面
2. 点击右上角 "..." → "Connections"
3. 选择你刚创建的 Integration
4. 确保 Integration 有读取权限

### 步骤 3: 获取页面 ID

1. 打开你的 Notion 根页面
2. 复制页面 URL，格式类似：
   ```
   https://www.notion.so/Your-Page-Title-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
3. 最后那串字符就是 **Page ID**

### 步骤 4: 安装 docu-notion

```bash
npm install -g docu-notion
# 或使用 npx（推荐）
npx docu-notion
```

### 步骤 5: 运行同步命令

```bash
docu-notion \
  -n "你的_NOTION_TOKEN" \
  -r "你的_PAGE_ID" \
  -m ./docs
```

参数说明：
- `-n` 或 `--notion-token`: Notion Integration Token
- `-r` 或 `--root-page-id`: Notion 根页面 ID
- `-m` 或 `--markdown-output-path`: 输出目录（通常是 `./docs`）

### 步骤 6: 配置环境变量（推荐）

创建 `.env` 文件（不要提交到 Git）：

```env
NOTION_TOKEN=secret_xxxxxxxxxxxxx
NOTION_ROOT_PAGE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

然后使用：

```bash
docu-notion \
  -n $NOTION_TOKEN \
  -r $NOTION_ROOT_PAGE_ID \
  -m ./docs
```

## ⚙️ 高级配置

### 只同步已发布的页面

如果你的 Notion 页面有 `status` 属性，可以只同步状态为 "Published" 的页面：

```bash
docu-notion \
  -n $NOTION_TOKEN \
  -r $NOTION_ROOT_PAGE_ID \
  -m ./docs \
  --status-filter Published
```

### 自定义图片路径

```bash
docu-notion \
  -n $NOTION_TOKEN \
  -r $NOTION_ROOT_PAGE_ID \
  -m ./docs \
  --img-output-path ./static/img/notion
```

### 排除某些页面

在 Notion 页面标题前加 `_` 或 `-`，docu-notion 会自动忽略。

## 🔄 自动化同步

### 方法 1: 使用 npm scripts

在 `package.json` 中添加：

```json
{
  "scripts": {
    "sync:notion": "docu-notion -n $NOTION_TOKEN -r $NOTION_ROOT_PAGE_ID -m ./docs",
    "start": "npm run sync:notion && docusaurus start",
    "build": "npm run sync:notion && docusaurus build"
  }
}
```

### 方法 2: GitHub Actions（推荐）

创建 `.github/workflows/sync-notion.yml`：

```yaml
name: Sync Notion to Docusaurus

on:
  schedule:
    - cron: '0 */6 * * *'  # 每6小时同步一次
  workflow_dispatch:  # 手动触发

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm install
      
      - name: Sync from Notion
        env:
          NOTION_TOKEN: ${{ secrets.NOTION_TOKEN }}
          NOTION_ROOT_PAGE_ID: ${{ secrets.NOTION_ROOT_PAGE_ID }}
        run: |
          npx docu-notion \
            -n "$NOTION_TOKEN" \
            -r "$NOTION_ROOT_PAGE_ID" \
            -m ./docs
      
      - name: Commit changes
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add docs/
          git diff --staged --quiet || git commit -m "Sync from Notion [skip ci]"
          git push
```

在 GitHub 仓库设置中添加 Secrets：
- `NOTION_TOKEN`
- `NOTION_ROOT_PAGE_ID`

## 📝 Notion 页面结构建议

为了获得最佳效果，建议这样组织 Notion 页面：

```
📚 文档根页面
├── 📖 AI学习
│   ├── 🎯 AI基础入门
│   ├── 🤖 机器学习实战
│   └── 🧠 深度学习进阶
└── 🛠️ 工具使用
    ├── 📝 Git使用指南
    ├── 💻 VS Code配置
    └── 🐳 Docker入门
```

### 使用 Notion 属性

在 Notion 页面中添加属性：
- `status` - 页面状态（Draft/Published）
- `tags` - 标签
- `date` - 发布日期
- `author` - 作者

这些属性会自动转换为 Markdown front-matter。

## ⚠️ 注意事项

1. **图片路径**: 确保图片路径正确，可能需要调整 `static` 目录
2. **链接格式**: Notion 内部链接可能需要手动调整
3. **复杂格式**: 某些 Notion 特有格式（如多列布局）可能无法完美转换
4. **API 限制**: Notion API 有速率限制，大量页面可能需要分批同步

## 🔗 参考资源

- [docu-notion GitHub](https://github.com/sillsdev/docu-notion)
- [Notion API 文档](https://developers.notion.com/)
- [Docusaurus 文档](https://docusaurus.io/docs)

## 💡 最佳实践

1. **定期同步**: 设置自动化同步，保持内容最新
2. **版本控制**: 同步后的 Markdown 文件提交到 Git
3. **测试**: 同步后先本地预览，确认格式正确
4. **备份**: 重要内容在 Notion 中保留备份

---

需要我帮你设置自动化同步脚本吗？
