# 快速部署指南 - 5分钟上线

## 最简单的方法：GitHub Pages

### 第一步：创建GitHub仓库（2分钟）

1. 访问 https://github.com
2. 登录您的账号（如果没有，先注册）
3. 点击右上角 **"+"** -> **"New repository"**
4. 填写信息：
   - Repository name: `aotmsh`（或您喜欢的名称）
   - Description: `Q版奥特曼送花电子贺卡`
   - 选择 **Public**（公开）
   - **不要**勾选任何初始化选项
5. 点击 **"Create repository"**

### 第二步：上传代码（1分钟）

#### 方法1：使用部署脚本（推荐）

```bash
cd /home/hexl/repo/aotmsh
./deploy.sh
```

按提示输入GitHub仓库URL即可。

#### 方法2：手动上传

```bash
cd /home/hexl/repo/aotmsh

# 初始化Git（如果还没有）
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit"

# 添加远程仓库（替换your-username）
git remote add origin https://github.com/your-username/aotmsh.git

# 推送到GitHub
git branch -M main
git push -u origin main
```

### 第三步：启用GitHub Pages（1分钟）

1. 在GitHub仓库页面，点击 **Settings**
2. 左侧菜单找到 **Pages**
3. 在 **Source** 中选择：
   - Branch: `main`
   - Folder: `/ (root)`
4. 点击 **Save**
5. 等待1-2分钟

### 第四步：访问网站（立即）

访问：`https://your-username.github.io/aotmsh/`

**将 `your-username` 替换为您的GitHub用户名**

例如：`https://hexl.github.io/aotmsh/`

---

## 更新网站

每次修改后，运行：

```bash
./deploy.sh
```

或者手动：

```bash
git add .
git commit -m "更新描述"
git push
```

---

## 配置微信分享

部署后，更新 `index.html` 中的URL：

```html
<meta property="og:url" content="https://your-username.github.io/aotmsh/">
<meta property="og:image" content="https://your-username.github.io/aotmsh/images/og-image.jpg">
```

然后重新部署：

```bash
./deploy.sh
```

---

## 其他部署平台

### Vercel（推荐，更简单）

1. 访问 https://vercel.com
2. 使用GitHub登录
3. 点击 **Add New Project**
4. 选择仓库，点击 **Deploy**
5. 完成！

### Netlify

1. 访问 https://www.netlify.com
2. 使用GitHub登录
3. 拖拽项目文件夹到页面
4. 完成！

---

## 常见问题

### Q: 网站显示404？

A: 检查：
1. GitHub Pages是否已启用
2. 仓库是否为Public
3. 等待1-2分钟让GitHub处理

### Q: 图片不显示？

A: 检查：
1. 图片路径是否正确（使用相对路径）
2. 图片文件是否已上传
3. 清除浏览器缓存

### Q: 微信分享不工作？

A: 确保：
1. 使用HTTPS链接（GitHub Pages自动提供）
2. 更新了og:url和og:image标签
3. 图片路径使用完整URL

---

## 完成！

现在您的电子贺卡已经可以在外网访问了！

**分享链接给朋友，让他们也能看到！** 🎉

