#!/bin/bash

# 快速启动本地服务器脚本

echo "========================================="
echo "Q版奥特曼送花电子贺卡 - 本地服务器"
echo "========================================="
echo ""

PORT=8000

# 检查端口是否被占用
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null ; then
    echo "警告：端口 $PORT 已被占用"
    echo "请关闭占用该端口的程序，或修改脚本中的端口号"
    exit 1
fi

# 检查Python是否安装
if command -v python3 &> /dev/null; then
    echo "使用Python3启动服务器..."
    echo "访问地址: http://localhost:$PORT"
    echo "按 Ctrl+C 停止服务器"
    echo ""
    python3 -m http.server $PORT
elif command -v python &> /dev/null; then
    echo "使用Python启动服务器..."
    echo "访问地址: http://localhost:$PORT"
    echo "按 Ctrl+C 停止服务器"
    echo ""
    python -m SimpleHTTPServer $PORT
else
    echo "错误：未找到Python"
    echo "请安装Python或使用其他方式启动服务器"
    echo ""
    echo "其他启动方式："
    echo "1. 使用Node.js: npx http-server"
    echo "2. 使用PHP: php -S localhost:$PORT"
    echo "3. 直接在浏览器中打开 index.html"
    exit 1
fi

