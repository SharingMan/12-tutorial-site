# Notion Integration 设置详细指南

## 📋 完整步骤

### 步骤 1: 创建 Notion Integration

1. **访问 Integration 页面**
   - 打开浏览器，访问：https://www.notion.so/my-integrations
   - 或点击 Notion 左下角 **Settings & members** → **Connections** → **Develop or manage integrations**

2. **创建新的 Integration**
   - 点击右上角 **"+ New integration"** 按钮
   - 填写信息：
     - **Name**: 输入名称，如 "Docusaurus Sync" 或 "我的文档同步"
     - **Logo**: （可选）上传一个图标
     - **Associated workspace**: 选择你的工作区
   - 点击 **Submit**

3. **获取 Integration Token**
   - 创建成功后，你会看到一个页面
   - 找到 **"Internal Integration Token"** 部分
   - 点击 **"Show"** 或 **"Copy"** 复制 Token
   - Token 格式类似：`secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - ⚠️ **重要**: 保存好这个 Token，关闭页面后就看不到了

4. **配置权限（可选）**
   - 在 Integration 设置页面，可以配置：
     - **Content Capabilities**: 选择 "Read content"（只需要读取权限）
     - **Comment Capabilities**: 通常不需要
     - **Update Capabilities**: 通常不需要

---

### 步骤 2: 分享页面给 Integration

这是最关键的一步！有**两种方法**：

#### 方法一：从页面分享（推荐）

1. **打开你要同步的 Notion 页面**
   - 可以是单个页面，也可以是包含子页面的父页面

2. **打开分享菜单**
   - 点击页面右上角的 **"Share"** 或 **"分享"** 按钮
   - 或使用快捷键：`Cmd/Ctrl + Shift + P`（Mac）或 `Ctrl + Shift + P`（Windows）

3. **添加 Integration**
   - 在分享弹窗中，点击 **"Add people, emails, groups, or integrations"**
   - 在搜索框中输入你刚创建的 Integration 名称（如 "Docusaurus Sync"）
   - 点击搜索结果中的 Integration

4. **设置权限**
   - 确保权限设置为 **"Can view"**（查看权限）
   - 点击 **"Invite"** 或 **"邀请"**

5. **确认分享成功**
   - Integration 会出现在分享列表中
   - 状态显示为 "Can view"

#### 方法二：从 Integration 设置页面分享

1. **回到 Integration 设置页面**
   - 访问：https://www.notion.so/my-integrations
   - 点击你刚创建的 Integration

2. **添加连接**
   - 在 Integration 页面中，找到 **"Connections"** 部分
   - 点击 **"+ Add connections"**
   - 选择你要分享的页面或数据库
   - 点击确认

---

### 步骤 3: 获取页面 ID

1. **打开 Notion 页面**
   - 在浏览器中打开你要同步的页面

2. **复制页面 URL**
   - 页面 URL 格式类似：
     ```
     https://www.notion.so/My-Page-Title-1234567890abcdef1234567890abcdef
     ```
     或
     ```
     https://your-workspace.notion.site/My-Page-Title-1234567890abcdef1234567890abcdef
     ```

3. **提取 Page ID**
   - Page ID 是 URL 中最后一个 `-` 后面的那串字符
   - 例如：`1234567890abcdef1234567890abcdef`
   - 如果 URL 中有多个 `-`，取最后一个 `-` 后面的部分
   - Page ID 通常是 32 个字符（字母和数字）

4. **验证 Page ID 格式**
   - 正确的格式：32 个十六进制字符（0-9, a-f）
   - 示例：`a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6`

---

### 步骤 4: 配置环境变量

1. **创建 .env 文件**
   ```bash
   cd tutorial-site
   cp env.example .env
   ```

2. **编辑 .env 文件**
   ```env
   NOTION_TOKEN=secret_你的_token_这里
   NOTION_ROOT_PAGE_ID=你的_page_id_这里
   ```

3. **保存文件**
   - 确保 `.env` 文件不会被提交到 Git（已在 .gitignore 中）

---

## 🎯 常见问题

### Q1: 找不到 "Share" 按钮？

**A**: 确保：
- 你有该页面的编辑权限
- 页面不是私有页面（某些企业版设置）
- 尝试刷新页面

### Q2: 搜索不到我的 Integration？

**A**: 检查：
- Integration 名称拼写是否正确
- 是否在正确的工作区中
- 尝试输入 Integration 的部分名称

### Q3: Page ID 提取错误？

**A**: 使用这个工具验证：
- 访问：https://www.notion.so/help/add-and-customize-integrations-with-the-notion-api
- 或使用浏览器开发者工具查看页面源码中的 page ID

### Q4: 如何分享整个数据库？

**A**: 
- 方法一：分享数据库本身（点击数据库标题 → Share）
- 方法二：分享包含数据库的父页面

### Q5: 如何分享多个页面？

**A**: 
- 如果页面在同一层级，分享它们的父页面
- 如果页面在不同位置，需要分别分享每个页面

---

## 🔍 验证设置是否正确

运行测试命令：

```bash
# 确保环境变量已设置
echo $NOTION_TOKEN
echo $NOTION_ROOT_PAGE_ID

# 测试同步（使用 npx，不需要全局安装）
npx docu-notion \
  -n "$NOTION_TOKEN" \
  -r "$NOTION_ROOT_PAGE_ID" \
  -m ./docs-test
```

如果成功，会在 `docs-test` 目录中看到导出的 Markdown 文件。

---

## 📸 截图说明（文字版）

### 分享页面流程：

```
1. 打开 Notion 页面
   ↓
2. 点击右上角 "Share" 按钮
   ↓
3. 点击 "Add people, emails, groups, or integrations"
   ↓
4. 搜索你的 Integration 名称
   ↓
5. 选择 Integration
   ↓
6. 确认权限为 "Can view"
   ↓
7. 点击 "Invite"
   ↓
8. ✅ 完成！
```

---

## 💡 提示

1. **页面层级**: 如果分享父页面，所有子页面也会被同步
2. **权限**: Integration 只需要 "Can view" 权限即可
3. **安全性**: Token 和 Page ID 是敏感信息，不要泄露
4. **测试**: 建议先用一个测试页面验证，确认无误后再同步正式内容

---

需要更多帮助？查看 [`notion-sync.md`](./notion-sync.md) 了解完整同步流程。
