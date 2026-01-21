import React from 'react';
import styles from './styles.module.css';

interface AdSlotProps {
  /**
   * 广告位置标识
   */
  position: 'sidebar' | 'content-top' | 'content-bottom' | 'footer';
  /**
   * 广告代码（可以是 Google AdSense、百度联盟等）
   */
  adCode?: string;
  /**
   * 是否启用广告（方便后续控制）
   */
  enabled?: boolean;
}

/**
 * 广告插槽组件
 * 用于在文档页面中插入广告
 * 
 * 使用示例：
 * ```tsx
 * <AdSlot 
 *   position="sidebar" 
 *   adCode="<script>...</script>"
 *   enabled={true}
 * />
 * ```
 */
export default function AdSlot({
  position,
  adCode,
  enabled = false,
}: AdSlotProps): JSX.Element | null {
  // 如果未启用，返回 null
  if (!enabled) {
    return null;
  }

  // 如果没有广告代码，显示占位符（开发时使用）
  if (!adCode) {
    return (
      <div className={styles.adSlot} data-position={position}>
        <div className={styles.adPlaceholder}>
          <p>广告位：{position}</p>
          <small>在此处添加广告代码</small>
        </div>
      </div>
    );
  }

  // 渲染实际广告代码
  return (
    <div 
      className={styles.adSlot} 
      data-position={position}
      dangerouslySetInnerHTML={{ __html: adCode }}
    />
  );
}
