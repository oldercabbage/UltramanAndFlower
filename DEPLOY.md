# 部署指南

## 部署到GitHub Pages

### 步骤1：创建GitHub仓库

1. 登录GitHub
2. 点击右上角的 "+" 号，选择 "New repository"
3. 输入仓库名称（如 `aotmsh`）
4. 选择 Public（公开）或 Private（私有）
5. 不要初始化README、.gitignore或license（我们已经有了）
6. 点击 "Create repository"

### 步骤2：上传项目到GitHub

```bash
# 初始化Git仓库
git init

# 添加所有文件
git add .

# 提交更改
git commit -m "Initial commit: Q版奥特曼送花电子贺卡"

# 添加远程仓库（替换your-username为你的GitHub用户名）
git remote add origin https://github.com/your-username/aotmsh.git

# 推送到GitHub
git branch -M main
git push -u origin main
```

### 步骤3：启用GitHub Pages

1. 进入GitHub仓库页面
2. 点击 "Settings"（设置）
3. 在左侧菜单找到 "Pages"
4. 在 "Source" 中选择 "Deploy from a branch"
5. 选择分支：`main`
6. 选择文件夹：`/ (root)`
7. 点击 "Save"
8. 等待几分钟，GitHub会生成访问链接

### 步骤4：访问你的网站

访问链接格式：`https://your-username.github.io/aotmsh/`

## 部署到其他平台

### Vercel

1. 访问 https://vercel.com
2. 使用GitHub账号登录
3. 点击 "New Project"
4. 导入GitHub仓库
5. 点击 "Deploy"
6. 等待部署完成

### Netlify

1. 访问 https://www.netlify.com
2. 使用GitHub账号登录
3. 点击 "New site from Git"
4. 选择GitHub仓库
5. 配置构建设置（不需要构建，直接部署）
6. 点击 "Deploy site"
7. 等待部署完成

### Cloudflare Pages

1. 访问 https://pages.cloudflare.com
2. 使用GitHub账号登录
3. 点击 "Create a project"
4. 连接GitHub仓库
5. 配置构建设置
6. 点击 "Save and Deploy"
7. 等待部署完成

## 自定义域名（可选）

### GitHub Pages自定义域名

1. 在仓库根目录创建 `CNAME` 文件
2. 写入你的域名（如 `card.example.com`）
3. 在你的域名DNS中添加CNAME记录
4. 指向 `your-username.github.io`

### 其他平台自定义域名

参考各平台的文档进行配置。

## 更新网站

每次更新代码后：

```bash
# 添加更改
git add .

# 提交更改
git commit -m "更新描述"

# 推送到GitHub
git push
```

GitHub Pages会自动重新部署，通常几分钟内生效。

## 故障排除

### 网站无法访问

1. 检查GitHub Pages设置是否正确
2. 检查仓库是否为Public（免费账户）
3. 等待几分钟让DNS生效
4. 检查文件路径是否正确

### 图片无法显示

1. 检查图片路径是否正确
2. 检查图片文件是否存在
3. 检查文件大小是否过大
4. 清除浏览器缓存

### 微信分享不工作

1. 确保网站使用HTTPS（GitHub Pages自动支持）
2. 检查og-image.jpg是否存在
3. 检查Open Graph标签是否正确
4. 使用微信开发者工具调试

## 性能优化

### 启用压缩

GitHub Pages自动启用Gzip压缩。

### 使用CDN

可以考虑使用CDN加速静态资源。

### 图片优化

- 压缩图片文件
- 使用适当的图片格式
- 考虑使用WebP格式

## 安全建议

- 不要提交敏感信息
- 使用HTTPS（GitHub Pages自动支持）
- 定期更新依赖
- 检查代码安全性

## 监控和分析

### Google Analytics

可以在HTML中添加Google Analytics代码。

### 其他分析工具

- 百度统计
- 腾讯分析
- 其他网站分析工具

---

**祝部署顺利！** 🚀

