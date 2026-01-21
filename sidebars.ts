import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'category',
      label: '📅 2024新海周记',
      items: [
        '2024新海周记/新海周记',
        '2024新海周记/新海周记22期',
        '2024新海周记/新海周记23期',
        '2024新海周记/新海周记24期',
        '2024新海周记/新海周记25期',
        '2024新海周记/新海周记26期',
        '2024新海周记/新海周记27期',
        '2024新海周记/新海周记-28期',
        '2024新海周记/新海周记-29期',
        '2024新海周记/新海周记-30期',
        '2024新海周记/新海周记-31期',
        '2024新海周记/新海周记-32期',
        '2024新海周记/新海周记-33期',
        '2024新海周记/新海周记-34期',
        '2024新海周记/新海周记-35期-(待编辑)',
        '2024新海周记/新海周记-36期-(待编辑)',
        '2024新海周记/新海周记-37期-寻找属于自己的秩序',
      ],
    },
    {
      type: 'category',
      label: '📅 2026新海周记',
      items: [
        '2026新海周记/新海周记',
        '2026新海周记/我的生活周记38-重启生活',
        '2026新海周记/我的生活周记39-稳步前行，创造日常微光',
      ],
    },
  ],
};

export default sidebars;
