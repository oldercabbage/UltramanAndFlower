# 简单部署指南 - 无需GitHub Actions

## 为什么不需要GitHub Actions？

对于静态HTML项目，**GitHub Pages可以直接从分支部署**，不需要GitHub Actions。这样可以：
- ✅ 避免权限问题
- ✅ 更简单
- ✅ 更稳定
- ✅ 更快速

## 部署步骤

### 1. 推送代码到GitHub

```bash
./deploy.sh
```

或手动：

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. 启用GitHub Pages（静态部署）

1. 访问GitHub仓库页面
2. 点击 **Settings**
3. 左侧菜单找到 **Pages**
4. 在 **Source** 中选择：
   - **Deploy from a branch** ⭐（选择这个）
   - Branch: `main`
   - Folder: `/ (root)`
5. 点击 **Save**
6. 等待1-2分钟

### 3. 访问网站

访问：`https://your-username.github.io/aotmsh/`

## 重要提示

- ✅ **使用 "Deploy from a branch"**（静态部署）
- ❌ **不要使用 "GitHub Actions"**（会有权限问题）
- ✅ 这是最简单可靠的方式

## 更新网站

每次修改后：

```bash
./deploy.sh
```

或：

```bash
git add .
git commit -m "Update"
git push
```

GitHub Pages会自动更新，无需额外配置。

## 故障排除

### 如果看到GitHub Actions错误

1. 删除 `.github/workflows/` 目录
2. 使用 "Deploy from a branch" 方式
3. 重新保存Pages设置

### 如果网站无法访问

1. 检查仓库是否为Public
2. 检查Pages设置是否正确
3. 等待1-2分钟让GitHub处理
4. 检查分支名称是否为 `main` 或 `master`

---

**使用静态部署，简单可靠！** ✅

