/**
 * 广告配置示例文件
 * 
 * 使用方法：
 * 1. 复制此文件为 ads.config.ts
 * 2. 填入你的广告代码
 * 3. 在组件中导入使用
 */

export const adsConfig = {
  // 是否启用广告
  enabled: false,

  // 各位置的广告代码
  ads: {
    sidebar: `
      <!-- 侧边栏广告示例 -->
      <div style="min-height: 250px; background: #f0f0f0; display: flex; align-items: center; justify-content: center;">
        <p>侧边栏广告位</p>
      </div>
    `,
    
    contentTop: `
      <!-- 内容顶部广告示例 -->
      <div style="min-height: 100px; background: #e0e0e0; display: flex; align-items: center; justify-content: center; margin: 1rem 0;">
        <p>内容顶部广告位</p>
      </div>
    `,
    
    contentBottom: `
      <!-- 内容底部广告示例 -->
      <div style="min-height: 100px; background: #e0e0e0; display: flex; align-items: center; justify-content: center; margin: 1rem 0;">
        <p>内容底部广告位</p>
      </div>
    `,
    
    footer: `
      <!-- 页脚广告示例 -->
      <div style="min-height: 90px; background: #d0d0d0; display: flex; align-items: center; justify-content: center;">
        <p>页脚广告位</p>
      </div>
    `,
  },

  // Google AdSense 示例配置
  // 替换为你的实际广告代码
  googleAdSense: {
    clientId: 'ca-pub-xxxxxxxxxx', // 替换为你的 AdSense 发布商 ID
    slots: {
      sidebar: 'xxxxxxxxxx', // 侧边栏广告位 ID
      contentTop: 'xxxxxxxxxx', // 内容顶部广告位 ID
      contentBottom: 'xxxxxxxxxx', // 内容底部广告位 ID
    },
  },

  // 百度联盟示例配置
  baiduUnion: {
    // 百度联盟配置
  },
};

/**
 * 生成 Google AdSense 广告代码
 */
export function generateGoogleAdSenseCode(position: 'sidebar' | 'contentTop' | 'contentBottom' | 'footer'): string {
  const {clientId, slots} = adsConfig.googleAdSense;
  const slotId = slots[position];
  
  return `
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}"
         crossorigin="anonymous"></script>
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="${clientId}"
         data-ad-slot="${slotId}"
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
    <script>
         (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
  `;
}
