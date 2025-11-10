# 云端部署指南 - 外网访问

本指南将帮助您将Q版奥特曼送花电子贺卡部署到云端，确保外网可以访问。

## 方案对比

| 方案 | 免费 | 易用性 | HTTPS | 自定义域名 | 推荐度 |
|------|------|--------|-------|-----------|--------|
| GitHub Pages | ✅ | ⭐⭐⭐⭐⭐ | ✅ | ✅ | ⭐⭐⭐⭐⭐ |
| Vercel | ✅ | ⭐⭐⭐⭐⭐ | ✅ | ✅ | ⭐⭐⭐⭐⭐ |
| Netlify | ✅ | ⭐⭐⭐⭐ | ✅ | ✅ | ⭐⭐⭐⭐ |
| Cloudflare Pages | ✅ | ⭐⭐⭐⭐ | ✅ | ✅ | ⭐⭐⭐⭐ |

## 方案1：GitHub Pages（最推荐）

### 优点
- 完全免费
- 自动HTTPS
- 操作简单
- 支持自定义域名
- 适合微信分享

### 部署步骤

#### 1. 创建GitHub仓库

```bash
# 在项目目录下
cd /home/hexl/repo/aotmsh

# 初始化Git仓库（如果还没有）
git init

# 添加所有文件
git add .

# 提交更改
git commit -m "Q版奥特曼送花电子贺卡"

# 创建GitHub仓库（在GitHub网站上）
# 1. 访问 https://github.com
# 2. 点击右上角 "+" -> "New repository"
# 3. 仓库名称：aotmsh（或您喜欢的名称）
# 4. 选择 Public（公开）
# 5. 不要勾选 "Initialize this repository with a README"
# 6. 点击 "Create repository"

# 添加远程仓库（替换your-username为您的GitHub用户名）
git remote add origin https://github.com/your-username/aotmsh.git

# 推送到GitHub
git branch -M main
git push -u origin main
```

#### 2. 启用GitHub Pages

1. 进入GitHub仓库页面
2. 点击 **Settings**（设置）
3. 在左侧菜单找到 **Pages**
4. 在 **Source** 中选择：
   - Branch: `main`
   - Folder: `/ (root)`
5. 点击 **Save**
6. 等待1-2分钟，GitHub会生成访问链接

#### 3. 访问网站

访问链接格式：`https://your-username.github.io/aotmsh/`

例如：`https://hexl.github.io/aotmsh/`

### 更新网站

每次修改后：

```bash
git add .
git commit -m "更新描述"
git push
```

GitHub Pages会自动更新，通常1-2分钟内生效。

---

## 方案2：Vercel（推荐）

### 优点
- 完全免费
- 自动HTTPS
- 全球CDN加速
- 自动部署
- 操作简单

### 部署步骤

#### 1. 安装Vercel CLI（可选）

```bash
npm install -g vercel
```

#### 2. 通过网页部署（推荐）

1. 访问 https://vercel.com
2. 使用GitHub账号登录
3. 点击 **Add New Project**
4. 导入GitHub仓库（如果已推送）或直接上传文件
5. 配置：
   - Framework Preset: **Other**
   - Root Directory: `./`
   - Build Command: 留空
   - Output Directory: `./`
6. 点击 **Deploy**
7. 等待部署完成

#### 3. 访问网站

部署完成后，Vercel会提供一个链接，例如：
`https://aotmsh.vercel.app`

### 自动部署

连接GitHub仓库后，每次推送代码会自动部署。

---

## 方案3：Netlify

### 优点
- 完全免费
- 自动HTTPS
- 全球CDN
- 操作简单

### 部署步骤

#### 1. 通过网页部署

1. 访问 https://www.netlify.com
2. 使用GitHub账号登录
3. 点击 **Add new site** -> **Import an existing project**
4. 选择GitHub，授权并选择仓库
5. 配置：
   - Build command: 留空
   - Publish directory: `.`
6. 点击 **Deploy site**
7. 等待部署完成

#### 2. 访问网站

部署完成后，Netlify会提供一个链接，例如：
`https://aotmsh.netlify.app`

---

## 方案4：Cloudflare Pages

### 优点
- 完全免费
- 自动HTTPS
- 全球CDN
- 速度快

### 部署步骤

1. 访问 https://pages.cloudflare.com
2. 使用GitHub账号登录
3. 点击 **Create a project**
4. 连接GitHub仓库
5. 配置：
   - Framework preset: None
   - Build command: 留空
   - Build output directory: `.`
6. 点击 **Save and Deploy**
7. 等待部署完成

---

## 配置微信分享

### 1. 更新Open Graph标签

部署后，需要更新 `index.html` 中的URL：

```html
<meta property="og:url" content="https://your-username.github.io/aotmsh/">
```

### 2. 更新分享图片路径

确保 `og-image.jpg` 使用绝对路径：

```html
<meta property="og:image" content="https://your-username.github.io/aotmsh/images/og-image.jpg">
```

### 3. 测试微信分享

1. 在微信中打开网站链接
2. 点击右上角分享按钮
3. 检查分享卡片是否正确显示

---

## 自定义域名（可选）

### GitHub Pages自定义域名

1. 在仓库根目录创建 `CNAME` 文件：
```bash
echo "card.yourdomain.com" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push
```

2. 在GitHub仓库Settings -> Pages中配置域名

3. 在域名DNS中添加CNAME记录：
   - 类型：CNAME
   - 名称：card（或您想要的子域名）
   - 值：your-username.github.io

### Vercel/Netlify自定义域名

在平台设置中添加自定义域名，按提示配置DNS。

---

## 快速部署脚本

创建一键部署脚本：

```bash
#!/bin/bash
# deploy.sh - 一键部署到GitHub Pages

echo "开始部署到GitHub Pages..."

# 检查是否已初始化Git
if [ ! -d ".git" ]; then
    echo "初始化Git仓库..."
    git init
fi

# 添加所有文件
git add .

# 提交更改
git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S')"

# 推送到GitHub
git push origin main

echo "部署完成！"
echo "访问地址：https://your-username.github.io/aotmsh/"
```

---

## 故障排除

### 1. 网站无法访问

- 检查GitHub Pages设置是否正确
- 检查仓库是否为Public
- 等待几分钟让DNS生效
- 检查文件路径是否正确

### 2. 图片无法显示

- 检查图片路径（使用相对路径）
- 检查图片文件是否存在
- 清除浏览器缓存

### 3. 微信分享不工作

- 确保使用HTTPS（所有平台都自动支持）
- 检查og-image.jpg是否存在
- 检查Open Graph标签是否正确
- 使用微信开发者工具调试

### 4. 更新后看不到变化

- 清除浏览器缓存（Ctrl+F5）
- 等待CDN更新（通常1-2分钟）
- 检查部署是否成功

---

## 性能优化建议

### 1. 图片优化

```bash
# 压缩图片（需要安装imagemagick）
convert images/og-image.jpg -quality 85 -resize 1200x630 images/og-image.jpg
```

### 2. 启用压缩

GitHub Pages/Vercel/Netlify都自动启用Gzip压缩。

### 3. 使用CDN

所有平台都提供全球CDN，无需额外配置。

---

## 安全建议

1. ✅ 使用HTTPS（所有平台自动支持）
2. ✅ 不要提交敏感信息
3. ✅ 定期更新依赖
4. ✅ 检查代码安全性

---

## 推荐方案

**对于微信分享，推荐使用GitHub Pages：**

1. ✅ 完全免费
2. ✅ 操作简单
3. ✅ 自动HTTPS
4. ✅ 支持自定义域名
5. ✅ 微信分享兼容性好

---

## 下一步

1. 选择部署平台
2. 按照步骤部署
3. 测试网站访问
4. 配置微信分享
5. 分享给朋友！

---

**祝部署顺利！** 🚀

