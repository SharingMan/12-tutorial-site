#!/bin/bash

# Notion 同步到 Docusaurus 脚本
# 使用方法: ./scripts/sync-notion.sh

set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 开始同步 Notion 到 Docusaurus...${NC}"

# 检查环境变量
if [ -z "$NOTION_TOKEN" ]; then
    echo -e "${RED}❌ 错误: NOTION_TOKEN 环境变量未设置${NC}"
    echo "请在 .env 文件中设置 NOTION_TOKEN，或运行:"
    echo "export NOTION_TOKEN='你的_token'"
    exit 1
fi

if [ -z "$NOTION_ROOT_PAGE_ID" ]; then
    echo -e "${RED}❌ 错误: NOTION_ROOT_PAGE_ID 环境变量未设置${NC}"
    echo "请在 .env 文件中设置 NOTION_ROOT_PAGE_ID，或运行:"
    echo "export NOTION_ROOT_PAGE_ID='你的_page_id'"
    exit 1
fi

# 使用 npx 运行最新版本的 @sillsdev/docu-notion
USE_NPX=true
DOCU_NOTION_PKG="@sillsdev/docu-notion"

# 创建备份目录
BACKUP_DIR="docs-backup-$(date +%Y%m%d-%H%M%S)"
if [ -d "docs" ]; then
    echo -e "${YELLOW}📦 备份现有文档到 $BACKUP_DIR...${NC}"
    cp -r docs "$BACKUP_DIR"
fi

# 运行同步
echo -e "${GREEN}📥 正在从 Notion 同步内容...${NC}"

if [ "$USE_NPX" = true ]; then
    npx --yes "$DOCU_NOTION_PKG" \
        -n "$NOTION_TOKEN" \
        -r "$NOTION_ROOT_PAGE_ID" \
        -m ./docs
else
    docu-notion \
        -n "$NOTION_TOKEN" \
        -r "$NOTION_ROOT_PAGE_ID" \
        -m ./docs
fi

if [ $? -eq 0 ]; then
    node scripts/fix-notion-mdx.js 2>/dev/null || true
    echo -e "${GREEN}✅ 同步成功！${NC}"
    echo -e "${GREEN}📁 文档已保存到 ./docs 目录${NC}"
    
    # 显示统计信息
    if command -v find &> /dev/null; then
        DOC_COUNT=$(find docs -name "*.md" -o -name "*.mdx" | wc -l | tr -d ' ')
        echo -e "${GREEN}📊 共同步 $DOC_COUNT 个文档文件${NC}"
    fi
    
    # 清理旧备份（保留最近3个）
    if [ -d "$BACKUP_DIR" ]; then
        echo -e "${YELLOW}🧹 清理旧备份...${NC}"
        ls -dt docs-backup-* | tail -n +4 | xargs rm -rf 2>/dev/null || true
    fi
else
    echo -e "${RED}❌ 同步失败！${NC}"
    # 恢复备份
    if [ -d "$BACKUP_DIR" ]; then
        echo -e "${YELLOW}🔄 恢复备份...${NC}"
        rm -rf docs
        mv "$BACKUP_DIR" docs
    fi
    exit 1
fi

echo -e "${GREEN}✨ 完成！现在可以运行 npm start 预览网站${NC}"
