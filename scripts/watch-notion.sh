#!/bin/bash

# Notion 自动同步监听脚本
# 使用方法: npm run watch:notion
# 每 5 分钟自动同步一次 Notion 内容

set -e

# 颜色输出
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查环境变量
if [ -z "$NOTION_TOKEN" ] || [ -z "$NOTION_ROOT_PAGE_ID" ]; then
    echo -e "${YELLOW}⚠️  加载环境变量...${NC}"
    if [ -f .env ]; then
        export $(cat .env | grep -v '^#' | xargs)
    else
        echo -e "${YELLOW}❌ 错误: .env 文件不存在${NC}"
        echo "请先创建 .env 文件并配置 NOTION_TOKEN 和 NOTION_ROOT_PAGE_ID"
        exit 1
    fi
fi

echo -e "${GREEN}🔄 Notion 自动同步监听已启动${NC}"
echo -e "${GREEN}⏰ 每 5 分钟自动同步一次${NC}"
echo -e "${GREEN}按 Ctrl+C 停止${NC}"
echo ""

# 首次同步
echo -e "${GREEN}[$(date +'%H:%M:%S')] 开始首次同步...${NC}"
npx --yes @sillsdev/docu-notion \
    -n "$NOTION_TOKEN" \
    -r "$NOTION_ROOT_PAGE_ID" \
    -m ./docs \
    -l info 2>&1 | grep -E "(Found|Finished|error)" || true
node scripts/fix-notion-mdx.js 2>/dev/null || true
echo -e "${GREEN}[$(date +'%H:%M:%S')] 首次同步完成${NC}"
echo ""

# 循环同步（每 5 分钟）
while true; do
    sleep 300  # 等待 5 分钟
    
    echo -e "${GREEN}[$(date +'%H:%M:%S')] 开始自动同步...${NC}"
    npx --yes @sillsdev/docu-notion \
        -n "$NOTION_TOKEN" \
        -r "$NOTION_ROOT_PAGE_ID" \
        -m ./docs \
        -l info 2>&1 | grep -E "(Found|Finished|error)" || true
    node scripts/fix-notion-mdx.js 2>/dev/null || true
    echo -e "${GREEN}[$(date +'%H:%M:%S')] 同步完成${NC}"
    echo ""
done
