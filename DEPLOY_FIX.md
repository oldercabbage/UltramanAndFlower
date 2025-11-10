# 部署错误修复指南

## 问题说明

GitHub Actions部署错误（exit code 128）通常是因为：
1. GitHub Actions权限配置问题
2. 对于静态HTML项目，不需要使用GitHub Actions

## 解决方案

### 方案1：不使用GitHub Actions（推荐）

对于静态HTML项目，**不需要使用GitHub Actions**，直接使用GitHub Pages的静态部署即可。

#### 步骤：

1. **删除GitHub Actions配置**（已自动删除）
   - 删除 `.github/workflows/deploy.yml` 文件

2. **直接使用GitHub Pages静态部署**：
   - 在GitHub仓库 Settings -> Pages
   - 选择 Source: `Deploy from a branch`
   - 选择 Branch: `main`
   - 选择 Folder: `/ (root)`
   - 点击 Save

3. **推送代码**：
   ```bash
   ./deploy.sh
   ```
   或手动：
   ```bash
   git add .
   git commit -m "Update"
   git push
   ```

4. **访问网站**：
   `https://your-username.github.io/aotmsh/`

### 方案2：修复GitHub Actions（如果必须使用）

如果必须使用GitHub Actions，需要配置权限：

1. **在GitHub仓库Settings中**：
   - Settings -> Actions -> General
   - 找到 "Workflow permissions"
   - 选择 "Read and write permissions"
   - 勾选 "Allow GitHub Actions to create and approve pull requests"
   - 点击 Save

2. **更新workflow配置**（如果需要）：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./
        cname: false
```

## 推荐方案

**对于静态HTML项目，推荐使用方案1（不使用GitHub Actions）**：

- ✅ 更简单
- ✅ 不需要配置权限
- ✅ 直接部署
- ✅ 更稳定

## 快速部署（推荐）

```bash
# 1. 推送代码
./deploy.sh

# 2. 在GitHub仓库Settings -> Pages中启用
# 3. 选择 Source: main branch, / (root)
# 4. 完成！
```

## 验证部署

部署后，检查：
1. GitHub仓库 Settings -> Pages 显示 "Your site is published at..."
2. 访问链接可以打开网站
3. 所有功能正常

---

**推荐使用方案1，最简单可靠！** ✅

