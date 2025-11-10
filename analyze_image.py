#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
分析Q版奥特曼图片，提取颜色和特征信息
"""

from PIL import Image
import os

def analyze_ultraman_image():
    """分析奥特曼图片"""
    image_path = "screenshot-20251110-201115.png"
    
    if not os.path.exists(image_path):
        print(f"错误：图片文件 {image_path} 不存在")
        return
    
    try:
        img = Image.open(image_path)
        print(f"图片尺寸: {img.size[0]} x {img.size[1]}")
        print(f"图片模式: {img.mode}")
        print()
        
        # 转换为RGB（如果是RGBA）
        if img.mode == 'RGBA':
            rgb_img = Image.new('RGB', img.size, (255, 255, 255))
            rgb_img.paste(img, mask=img.split()[3])
            img = rgb_img
        
        # 获取主要颜色
        colors = img.getcolors(maxcolors=256*256*256)
        if colors:
            # 排序并获取最常见的颜色
            colors.sort(reverse=True, key=lambda x: x[0])
            print("主要颜色（前10个）：")
            for i, (count, color) in enumerate(colors[:10], 1):
                print(f"{i}. RGB{color} - 出现次数: {count}")
                # 转换为十六进制
                hex_color = '#{:02x}{:02x}{:02x}'.format(color[0], color[1], color[2])
                print(f"   十六进制: {hex_color}")
        
        print()
        print("分析完成！")
        print()
        print("请根据图片中的Q版奥特曼特征调整CSS样式：")
        print("1. 检查颜色是否匹配（白色皮肤、黄色眼睛）")
        print("2. 检查比例和大小")
        print("3. 检查细节特征")
        
    except Exception as e:
        print(f"错误：{e}")

if __name__ == "__main__":
    analyze_ultraman_image()

