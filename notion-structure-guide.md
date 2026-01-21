# Notion 页面结构要求

## ⚠️ 重要：docu-notion 的页面结构要求

`docu-notion` 需要一个特定的 Notion 页面结构才能正常工作：

```
📄 根页面（你分享给 Integration 的页面）
└── 📄 Outline（必须命名为 "Outline"）
    ├── 📄 文档1
    ├── 📄 文档2
    └── 📄 文档3
```

## 🔧 如何调整你的 Notion 结构

### 方法一：创建 Outline 页面（推荐）

1. **在你的根页面下创建一个子页面**
   - 页面名称必须为：`Outline`（英文，大小写敏感）
   
2. **将你的文档页面移到 Outline 下**
   - 在 Outline 页面下创建或移动你的文档页面
   - 这些页面会成为 Docusaurus 的文档

3. **重新运行同步**
   ```bash
   npm run sync:notion:npx
   ```

### 方法二：使用 status 属性过滤（如果使用数据库）

如果你的文档在 Notion 数据库中：

1. **确保数据库有 `status` 属性**
2. **设置要发布的页面状态为 "Publish"**
3. **运行同步时指定 status 过滤**：
   ```bash
   npx @sillsdev/docu-notion \
     -n $NOTION_TOKEN \
     -r $NOTION_ROOT_PAGE_ID \
     -m ./docs \
     -t Publish
   ```

## 📋 当前问题分析

根据测试结果，你的 Notion 页面：
- ✅ Integration 连接正常
- ✅ Token 和 Page ID 正确
- ❌ 缺少 "Outline" 子页面
- ❌ 或页面没有内容/子页面

## 🎯 快速修复步骤

### 步骤 1: 在 Notion 中创建结构

```
【iTab 与 Genspark 合作提案-一起开创AI搜索新入口】（根页面）
└── Outline（新建子页面，必须叫这个名字）
    ├── 你的第一个文档
    ├── 你的第二个文档
    └── ...
```

### 步骤 2: 重新测试同步

```bash
cd tutorial-site
export $(cat .env | grep -v '^#' | xargs)
npm run sync:notion:npx
```

### 步骤 3: 检查结果

同步成功后，你应该能在 `docs/` 目录中看到 Markdown 文件。

## 💡 替代方案

如果你不想使用 "Outline" 结构，可以考虑：

1. **使用其他工具**：
   - `notion2markdown` (Python)
   - `n2m.xyz` (在线工具)
   - Notion 官方导出功能

2. **手动导出**：
   - 在 Notion 中使用 "Export" → "Markdown"
   - 手动整理到 `docs/` 目录

## 🔍 验证结构

运行测试命令查看详细信息：

```bash
export $(cat .env | grep -v '^#' | xargs)
npx @sillsdev/docu-notion \
  -n "$NOTION_TOKEN" \
  -r "$NOTION_ROOT_PAGE_ID" \
  -m ./docs-test \
  -l verbose
```

查看输出中的 "Found X pages" 来确认是否找到了页面。

---

需要我帮你创建一个示例 Outline 结构吗？
