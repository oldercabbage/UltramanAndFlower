# Q版奥特曼送花电子贺卡

一个使用HTML5 + CSS3 + JavaScript制作的精美电子贺卡，主题是Q版奥特曼送花。

## 项目特性

- 🎨 精美的CSS3动画效果
- 📱 响应式设计，完美适配移动端
- 🌸 花瓣飘落特效
- 🎭 Q版奥特曼送花动画
- 📤 微信分享支持
- 🚀 可部署到GitHub Pages

## 项目结构

```
aotmsh/
├── index.html          # 主页面
├── css/
│   └── style.css      # 样式文件
├── js/
│   └── main.js        # JavaScript逻辑
├── images/            # 图片资源
│   └── og-image.jpg   # 微信分享图片（需要添加）
├── audio/             # 音频资源（可选）
│   └── bgm.mp3        # 背景音乐（可选）
├── README.md          # 项目说明
└── .gitignore         # Git忽略文件
```

## 快速开始

### 本地运行

1. 克隆或下载项目
2. 直接在浏览器中打开 `index.html`
3. 或者使用本地服务器：
   ```bash
   # 使用Python
   python3 -m http.server 8000
   
   # 使用Node.js
   npx http-server
   ```
4. 访问 `http://localhost:8000`

### 部署到云端（外网访问）

**5分钟快速部署：**

1. **使用一键部署脚本**（推荐）：
   ```bash
   ./deploy.sh
   ```
   按提示输入GitHub仓库URL即可。

2. **或查看快速部署指南**：
   - [QUICK_DEPLOY.md](QUICK_DEPLOY.md) - 5分钟快速部署
   - [DEPLOY_CLOUD.md](DEPLOY_CLOUD.md) - 详细部署指南

**推荐平台：**
- **GitHub Pages** ⭐（最简单，免费，自动HTTPS）
- Vercel（更简单，全球CDN）
- Netlify（功能强大）

**所有平台都支持：**
- ✅ 完全免费
- ✅ 自动HTTPS（微信分享必需）
- ✅ 全球CDN加速
- ✅ 微信分享兼容

**部署后访问：**
- GitHub Pages: `https://your-username.github.io/aotmsh/`
- Vercel: `https://aotmsh.vercel.app`
- Netlify: `https://aotmsh.netlify.app`

## 功能说明

### 送花动画

- 点击"播放动画"按钮或向上滑动屏幕
- 奥特曼会举起手臂，花朵出现
- 花瓣飘落特效
- 显示祝福消息

### 分享功能

- 点击"分享给朋友"按钮
- 支持Web Share API（移动端）
- 自动复制链接到剪贴板（桌面端）
- 微信环境自动配置分享信息

### 响应式设计

- 完美适配手机、平板、电脑
- 触摸手势支持
- 键盘快捷键支持（Enter/Space）

## 自定义配置

### 修改祝福语

编辑 `index.html` 中的消息内容：

```html
<div class="message" id="message">
    <p class="message-text">亲爱的，</p>
    <p class="message-text">这束花送给你，</p>
    <p class="message-text">代表我对你的爱意！</p>
    <p class="message-text">❤️</p>
</div>
```

### 修改颜色主题

编辑 `css/style.css` 中的颜色值：

```css
/* 背景渐变 */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* 奥特曼颜色 */
background: #ff4444;
```

### 添加背景音乐

1. 将音乐文件放入 `audio/` 目录
2. 在 `index.html` 中取消注释音频标签
3. 修改音频文件路径

## 微信分享配置

### 1. 准备分享图片

- 尺寸：1200x630像素
- 格式：JPG或PNG
- 保存为 `images/og-image.jpg`

### 2. 配置Open Graph标签

在 `index.html` 的 `<head>` 中已经配置了Open Graph标签，需要修改URL：

```html
<meta property="og:url" content="https://your-username.github.io/aotmsh/">
```

### 3. 微信JS-SDK配置（可选）

如果需要自定义微信分享，需要：

1. 注册微信公众平台
2. 获取AppID和AppSecret
3. 配置JS-SDK
4. 在 `js/main.js` 中添加微信JS-SDK代码

## 浏览器兼容性

- Chrome/Edge: ✅ 完全支持
- Firefox: ✅ 完全支持
- Safari: ✅ 完全支持
- 微信浏览器: ✅ 完全支持
- 移动端浏览器: ✅ 完全支持

## 性能优化

- 使用CSS3动画代替JavaScript动画
- 图片懒加载
- 代码压缩
- CDN加速（可选）

## 故障排除

### 动画不播放

- 检查浏览器是否支持CSS3动画
- 检查JavaScript控制台是否有错误
- 尝试刷新页面

### 分享功能不工作

- 检查是否在HTTPS环境（GitHub Pages自动支持）
- 检查浏览器是否支持Web Share API
- 尝试手动复制链接

### 移动端显示异常

- 检查viewport meta标签
- 检查CSS媒体查询
- 清除浏览器缓存

## 开发计划

- [ ] 添加更多动画效果
- [ ] 添加音效
- [ ] 添加粒子效果
- [ ] 支持多语言
- [ ] 添加更多主题

## 贡献

欢迎提交Issue和Pull Request！

## 许可证

MIT License

## 联系方式

如有问题或建议，请提交Issue。

---

**祝你使用愉快！** 🎉
