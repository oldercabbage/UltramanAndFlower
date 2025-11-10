# 快速开始指南

## 本地运行

### 方法1：使用启动脚本（推荐）

```bash
./start.sh
```

然后访问 `http://localhost:8000`

### 方法2：使用Python

```bash
python3 -m http.server 8000
```

然后访问 `http://localhost:8000`

### 方法3：使用Node.js

```bash
npx http-server
```

然后访问显示的地址

### 方法4：直接打开

直接在浏览器中打开 `index.html` 文件（某些功能可能无法正常工作）

## 部署到GitHub Pages

### 步骤1：创建GitHub仓库

1. 登录GitHub
2. 创建新仓库（如 `aotmsh`）
3. 不要初始化README等文件

### 步骤2：上传代码

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/aotmsh.git
git push -u origin main
```

### 步骤3：启用GitHub Pages

1. 进入仓库 Settings
2. 找到 Pages
3. 选择 Source: main branch
4. 选择 Folder: / (root)
5. 点击 Save

### 步骤4：访问网站

等待几分钟后，访问：`https://your-username.github.io/aotmsh/`

## 自定义内容

### 修改祝福语

编辑 `index.html` 中的消息部分：

```html
<div class="message" id="message">
    <p class="message-text">你的祝福语</p>
</div>
```

### 修改颜色

编辑 `css/style.css` 中的颜色值

### 添加背景音乐

1. 将音乐文件放入 `audio/` 目录
2. 在 `index.html` 中取消注释音频标签
3. 修改音频文件路径

## 微信分享

### 准备分享图片

1. 运行脚本生成图片：
   ```bash
   python3 create_og_image.py
   ```

2. 或使用设计软件创建 `images/og-image.jpg`（1200x630像素）

### 配置分享信息

编辑 `index.html` 中的 Open Graph 标签：

```html
<meta property="og:title" content="你的标题">
<meta property="og:description" content="你的描述">
<meta property="og:url" content="你的网站URL">
```

## 功能测试

1. 打开 `test.html` 检查文件是否完整
2. 测试动画播放
3. 测试分享功能
4. 测试移动端显示

## 常见问题

### 动画不播放

- 检查浏览器控制台是否有错误
- 尝试刷新页面
- 检查JavaScript文件是否加载

### 分享不工作

- 确保使用HTTPS（GitHub Pages自动支持）
- 检查og-image.jpg是否存在
- 检查Open Graph标签

### 移动端显示异常

- 检查viewport meta标签
- 清除浏览器缓存
- 检查CSS媒体查询

## 下一步

- 自定义祝福语和颜色
- 添加背景音乐
- 部署到GitHub Pages
- 通过微信分享给朋友

---

**祝你使用愉快！** 🎉
