#!/bin/bash

# 一键部署脚本 - 部署到GitHub Pages

set -e

echo "========================================="
echo "Q版奥特曼送花电子贺卡 - 云端部署"
echo "========================================="
echo ""

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 检查Git是否安装
if ! command -v git &> /dev/null; then
    echo -e "${RED}错误：未安装Git${NC}"
    echo "请安装Git: sudo apt install git"
    exit 1
fi

# 检查是否在Git仓库中
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}初始化Git仓库...${NC}"
    git init
    echo "✅ Git仓库已初始化"
fi

# 检查是否有远程仓库
if ! git remote | grep -q "origin"; then
    echo -e "${YELLOW}未配置远程仓库${NC}"
    echo ""
    echo "请先创建GitHub仓库："
    echo "1. 访问 https://github.com"
    echo "2. 点击右上角 '+' -> 'New repository'"
    echo "3. 仓库名称：aotmsh（或您喜欢的名称）"
    echo "4. 选择 Public"
    echo "5. 点击 'Create repository'"
    echo ""
    read -p "请输入GitHub仓库URL（例如：https://github.com/your-username/aotmsh.git）: " REPO_URL
    
    if [ -z "$REPO_URL" ]; then
        echo -e "${RED}错误：未输入仓库URL${NC}"
        exit 1
    fi
    
    git remote add origin "$REPO_URL"
    echo "✅ 远程仓库已添加"
fi

# 检查文件是否存在
if [ ! -f "index.html" ]; then
    echo -e "${RED}错误：找不到index.html${NC}"
    exit 1
fi

# 添加所有文件
echo -e "${YELLOW}添加文件到Git...${NC}"
git add .

# 检查是否有更改
if git diff --staged --quiet; then
    echo -e "${YELLOW}没有更改需要提交${NC}"
else
    # 提交更改
    COMMIT_MSG="Deploy: $(date '+%Y-%m-%d %H:%M:%S')"
    echo -e "${YELLOW}提交更改...${NC}"
    git commit -m "$COMMIT_MSG"
    echo "✅ 更改已提交"
fi

# 推送到GitHub
echo -e "${YELLOW}推送到GitHub...${NC}"
BRANCH=$(git branch --show-current 2>/dev/null || echo "main")

if [ "$BRANCH" != "main" ] && [ "$BRANCH" != "master" ]; then
    echo -e "${YELLOW}当前分支：$BRANCH，切换到main分支...${NC}"
    git checkout -b main 2>/dev/null || git branch -M main
    BRANCH="main"
fi

git push -u origin "$BRANCH" || git push origin "$BRANCH"

echo ""
echo -e "${GREEN}✅ 部署完成！${NC}"
echo ""
echo "下一步："
echo "1. 访问GitHub仓库：$(git remote get-url origin | sed 's/\.git$//')"
echo "2. 进入 Settings -> Pages"
echo "3. 选择 Source: $BRANCH branch, / (root)"
echo "4. 点击 Save"
echo "5. 等待1-2分钟，访问：https://your-username.github.io/aotmsh/"
echo ""
echo "提示：将 'your-username' 替换为您的GitHub用户名"

