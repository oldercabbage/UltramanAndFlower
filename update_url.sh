#!/bin/bash

# 更新网站URL脚本
# 部署后运行此脚本更新index.html中的URL

if [ -z "$1" ]; then
    echo "用法: ./update_url.sh <网站URL>"
    echo "示例: ./update_url.sh https://hexl.github.io/aotmsh"
    exit 1
fi

SITE_URL="$1"

# 更新index.html中的URL
if [ -f "index.html" ]; then
    # 备份原文件
    cp index.html index.html.bak
    
    # 更新URL（使用sed，兼容不同格式）
    sed -i "s|property=\"og:url\" content=\"[^\"]*\"|property=\"og:url\" content=\"$SITE_URL\"|g" index.html
    sed -i "s|property=\"og:image\" content=\"[^\"]*\"|property=\"og:image\" content=\"$SITE_URL/images/og-image.jpg\"|g" index.html
    sed -i "s|name=\"wechat:image\" content=\"[^\"]*\"|name=\"wechat:image\" content=\"$SITE_URL/images/og-image.jpg\"|g" index.html
    
    echo "✅ URL已更新为: $SITE_URL"
    echo "✅ 图片URL已更新为: $SITE_URL/images/og-image.jpg"
    echo ""
    echo "现在运行 ./deploy.sh 部署更新"
else
    echo "错误：找不到index.html"
    exit 1
fi

