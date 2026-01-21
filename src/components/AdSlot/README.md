# 广告插槽组件使用指南

## 简介

`AdSlot` 组件用于在文档页面中插入广告。支持多种广告位置，方便后续集成 Google AdSense、百度联盟等广告平台。

## 使用方法

### 基本用法

在 MDX 文件中使用：

```tsx
import AdSlot from '@site/src/components/AdSlot';

<AdSlot 
  position="sidebar" 
  enabled={true}
/>
```

### 位置选项

- `sidebar` - 侧边栏广告（适合文档页面）
- `content-top` - 内容顶部广告
- `content-bottom` - 内容底部广告
- `footer` - 页脚广告

### 集成广告代码

当你有实际的广告代码时，可以这样使用：

```tsx
<AdSlot 
  position="content-top"
  adCode={`
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-xxxxxxxxxx"
         data-ad-slot="xxxxxxxxxx"
         data-ad-format="auto"></ins>
    <script>
         (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
  `}
  enabled={true}
/>
```

### 全局配置

可以在 `docusaurus.config.ts` 中配置广告开关：

```ts
const config = {
  // ... 其他配置
  customFields: {
    adsEnabled: process.env.ADS_ENABLED === 'true',
  },
};
```

然后在组件中使用：

```tsx
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const {siteConfig} = useDocusaurusContext();
const adsEnabled = siteConfig.customFields?.adsEnabled || false;

<AdSlot 
  position="sidebar"
  enabled={adsEnabled}
/>
```

## 注意事项

1. **开发环境** - 默认显示占位符，方便开发调试
2. **生产环境** - 设置 `enabled={true}` 并添加实际广告代码
3. **性能** - 广告代码可能影响页面加载速度，建议异步加载
4. **用户体验** - 合理控制广告位置和数量，避免影响阅读体验

## 示例

查看 `docs/ai-learning/basics.md` 中的使用示例。
