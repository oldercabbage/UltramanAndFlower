#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
创建微信分享图片（OG Image）
用于微信分享时显示的预览图
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_og_image():
    """创建OG图片（1200x630像素）"""
    # 创建图片
    width, height = 1200, 630
    img = Image.new('RGB', (width, height), color=(102, 126, 234))  # 紫色背景
    
    draw = ImageDraw.Draw(img)
    
    # 绘制渐变背景（简化版）
    for y in range(height):
        r = int(102 + (118 - 102) * y / height)
        g = int(126 + (75 - 126) * y / height)
        b = int(234 + (74 - 234) * y / height)
        draw.rectangle([(0, y), (width, y+1)], fill=(r, g, b))
    
    # 绘制标题
    try:
        # 尝试使用系统字体
        font_large = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 80)
        font_medium = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 50)
    except:
        # 如果没有找到字体，使用默认字体
        font_large = ImageFont.load_default()
        font_medium = ImageFont.load_default()
    
    # 标题
    title = "Q版奥特曼送花贺卡"
    title_bbox = draw.textbbox((0, 0), title, font=font_large)
    title_width = title_bbox[2] - title_bbox[0]
    title_height = title_bbox[3] - title_bbox[1]
    title_x = (width - title_width) // 2
    title_y = 150
    draw.text((title_x, title_y), title, fill=(255, 255, 255), font=font_large)
    
    # 副标题
    subtitle = "送给最爱的你"
    subtitle_bbox = draw.textbbox((0, 0), subtitle, font=font_medium)
    subtitle_width = subtitle_bbox[2] - subtitle_bbox[0]
    subtitle_x = (width - subtitle_width) // 2
    subtitle_y = title_y + title_height + 30
    draw.text((subtitle_x, subtitle_y), subtitle, fill=(255, 255, 255), font=font_medium)
    
    # 绘制简单的奥特曼轮廓（左侧）
    ultraman_x, ultraman_y = 200, 350
    # 头部
    draw.ellipse([ultraman_x-40, ultraman_y-40, ultraman_x+40, ultraman_y+40], 
                 fill=(255, 68, 68), outline=(204, 0, 0), width=5)
    # 身体
    draw.rectangle([ultraman_x-30, ultraman_y+40, ultraman_x+30, ultraman_y+120], 
                   fill=(255, 68, 68), outline=(204, 0, 0), width=5)
    # 眼睛
    draw.ellipse([ultraman_x-15, ultraman_y-10, ultraman_x-5, ultraman_y], fill=(255, 255, 255))
    draw.ellipse([ultraman_x+5, ultraman_y-10, ultraman_x+15, ultraman_y], fill=(255, 255, 255))
    
    # 绘制简单的花朵（右侧）
    flower_x, flower_y = 900, 350
    # 花瓣
    for i in range(5):
        import math
        angle = i * 72
        x = flower_x + 30 * math.cos(math.radians(angle))
        y = flower_y + 30 * math.sin(math.radians(angle))
        draw.ellipse([x-15, y-15, x+15, y+15], fill=(255, 105, 180), outline=(255, 20, 147), width=3)
    # 花心
    draw.ellipse([flower_x-10, flower_y-10, flower_x+10, flower_y+10], 
                 fill=(255, 215, 0), outline=(255, 140, 0), width=3)
    
    # 底部文字
    bottom_text = "一份特别的电子贺卡 ❤️"
    bottom_bbox = draw.textbbox((0, 0), bottom_text, font=font_medium)
    bottom_width = bottom_bbox[2] - bottom_bbox[0]
    bottom_x = (width - bottom_width) // 2
    bottom_y = height - 100
    draw.text((bottom_x, bottom_y), bottom_text, fill=(255, 255, 255), font=font_medium)
    
    return img

def main():
    """主函数"""
    print("创建微信分享图片（OG Image）...")
    
    # 创建目录
    images_dir = "images"
    os.makedirs(images_dir, exist_ok=True)
    
    # 创建图片
    img = create_og_image()
    img_path = os.path.join(images_dir, "og-image.jpg")
    img.save(img_path, "JPEG", quality=85)
    print(f"已保存: {img_path}")
    print(f"图片尺寸: {img.size[0]}x{img.size[1]}像素")
    print("\n提示：")
    print("1. 此图片用于微信分享时显示")
    print("2. 建议使用专业设计软件制作更精美的图片")
    print("3. 图片尺寸：1200x630像素")
    print("4. 文件大小建议小于200KB")

if __name__ == "__main__":
    try:
        main()
    except ImportError:
        print("错误：需要安装Pillow库")
        print("请运行: pip3 install Pillow")
    except Exception as e:
        print(f"错误: {e}")

