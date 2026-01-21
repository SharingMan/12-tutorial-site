# AI学习教程网站

基于 Docusaurus 构建的AI学习与工具使用教程网站。

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm start
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

### 构建生产版本

```bash
npm run build
```

构建后的文件在 `build` 目录中。

### 本地预览生产版本

```bash
npm run serve
```

## 📁 项目结构

```
tutorial-site/
├── docs/                    # 文档目录
│   ├── ai-learning/        # AI学习教程
│   └── tools/              # 工具使用指南
├── blog/                    # 博客文章
├── src/
│   ├── components/         # React 组件
│   │   ├── AdSlot/        # 广告插槽组件
│   │   └── HomepageFeatures/
│   ├── css/                # 自定义样式
│   └── pages/             # 页面组件
├── static/                 # 静态资源
├── docusaurus.config.ts    # Docusaurus 配置
└── sidebars.ts            # 侧边栏配置
```

## 📝 添加内容

### 方法一：直接在本地编写 Markdown

1. 在 `docs/` 目录下创建 Markdown 文件
2. 更新 `sidebars.ts` 配置侧边栏

### 方法二：从 Notion 同步（推荐）

使用 Notion 作为内容管理系统，自动同步到 Docusaurus：

1. **设置 Notion Integration**
   - 访问 https://www.notion.so/my-integrations
   - 创建新的 Integration，获取 Token

2. **配置环境变量**
   ```bash
   cp env.example .env
   # 编辑 .env 文件，填入你的 NOTION_TOKEN 和 NOTION_ROOT_PAGE_ID
   ```

3. **运行同步命令**
   ```bash
   npm run sync:notion
   # 或使用 npx 直接运行
   npm run sync:notion:npx
   ```

4. **查看详细文档**
   - 阅读 `notion-sync.md` 了解完整配置步骤
   - 支持自动化同步（GitHub Actions）

### 添加博客文章

在 `blog/` 目录下创建 Markdown 文件，文件名格式：`YYYY-MM-DD-title.md`

### 使用广告组件

在 MDX 文件中：

```tsx
import AdSlot from '@site/src/components/AdSlot';

<AdSlot position="sidebar" enabled={true} />
```

详细使用说明请查看 `src/components/AdSlot/README.md`

## 🎨 自定义配置

### 修改网站信息

编辑 `docusaurus.config.ts`：

- `title` - 网站标题
- `tagline` - 网站标语
- `url` - 网站URL
- `baseUrl` - 基础路径

### 配置广告

1. 复制 `ads.config.example.ts` 为 `ads.config.ts`
2. 填入你的广告代码
3. 在文档中使用 `AdSlot` 组件

## 📚 文档分类

### AI学习
- AI基础入门
- 机器学习实战
- 深度学习进阶

### 工具使用
- Git使用指南
- VS Code配置
- Docker入门

## 🔄 Notion 同步功能

本项目支持从 Notion 自动同步内容到 Docusaurus，让你可以：

- ✅ 在 Notion 中编写和管理内容
- ✅ 自动转换为 Markdown 格式
- ✅ 保留页面层级结构
- ✅ 支持自动化同步（GitHub Actions）

**详细说明请查看**: [`notion-sync.md`](./notion-sync.md)

## 🔧 技术栈

- [Docusaurus](https://docusaurus.io/) - 文档网站框架
- React - UI框架
- TypeScript - 类型支持
- Markdown/MDX - 内容编写

## 📖 更多信息

- [Docusaurus 文档](https://docusaurus.io/docs)
- [Docusaurus 博客](https://docusaurus.io/blog)

## 📄 许可证

MIT
