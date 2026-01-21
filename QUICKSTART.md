# 快速开始指南

## ✅ 已完成的工作

1. ✅ 初始化 Docusaurus 项目
2. ✅ 配置中文语言支持
3. ✅ 创建教程文档结构（AI学习 + 工具使用）
4. ✅ 添加示例教程内容
5. ✅ 创建广告插槽组件（AdSlot）
6. ✅ 自定义首页和导航

## 🎯 下一步操作

### 1. 启动开发服务器

```bash
cd tutorial-site
npm start
```

访问 http://localhost:3000 查看网站。

### 2. 添加你的内容

#### 添加新教程

在 `docs/ai-learning/` 或 `docs/tools/` 目录下创建新的 Markdown 文件，然后在 `sidebars.ts` 中添加引用。

#### 添加博客文章

在 `blog/` 目录下创建文件，格式：`YYYY-MM-DD-title.md`

### 3. 配置广告（可选）

#### 方法一：使用 AdSlot 组件

在 MDX 文件中：

```tsx
import AdSlot from '@site/src/components/AdSlot';

<AdSlot 
  position="sidebar" 
  adCode="你的广告代码"
  enabled={true}
/>
```

#### 方法二：使用配置文件

1. 复制 `ads.config.example.ts` 为 `ads.config.ts`
2. 填入你的广告代码
3. 在组件中导入使用

### 4. 部署网站

#### 部署到 GitHub Pages

1. 修改 `docusaurus.config.ts` 中的 `organizationName` 和 `projectName`
2. 运行 `npm run deploy`

#### 部署到其他平台

运行 `npm run build`，然后将 `build` 目录的内容上传到你的服务器。

## 📝 文档结构说明

```
docs/
├── ai-learning/          # AI学习教程
│   ├── intro.md          # 介绍页
│   ├── basics.mdx        # 基础入门（含广告示例）
│   ├── machine-learning.md
│   └── deep-learning.md
└── tools/                # 工具使用指南
    ├── intro.md
    ├── git.md
    ├── vscode.md
    └── docker.md
```

## 🎨 自定义配置

### 修改网站信息

编辑 `docusaurus.config.ts`：

- `title` - 网站标题（当前：AI学习教程）
- `tagline` - 网站标语
- `url` - 网站URL
- `baseUrl` - 基础路径

### 修改导航栏

在 `docusaurus.config.ts` 的 `navbar.items` 中修改。

### 修改侧边栏

编辑 `sidebars.ts` 文件。

## 🔧 常用命令

```bash
# 启动开发服务器
npm start

# 构建生产版本
npm run build

# 预览生产版本
npm run serve

# 清除缓存
npm run clear

# 类型检查
npm run typecheck
```

## 📚 参考资源

- [Docusaurus 官方文档](https://docusaurus.io/docs)
- [Docusaurus 中文文档](https://docusaurus.io/zh-CN/docs)
- [MDX 文档](https://mdxjs.com/)

## 💡 提示

1. **广告组件**：默认 `enabled={false}`，开发时不会显示广告，方便调试
2. **中文支持**：已配置简体中文，所有界面文字都是中文
3. **代码高亮**：支持多种编程语言的语法高亮
4. **搜索功能**：Docusaurus 内置全文搜索功能

## 🐛 问题排查

如果遇到问题：

1. 清除缓存：`npm run clear`
2. 重新安装依赖：`rm -rf node_modules && npm install`
3. 检查 Node.js 版本：需要 >= 20.0

---

祝你使用愉快！🎉
