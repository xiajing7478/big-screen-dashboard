# 🚀 CI/CD 完整实战指南

> 本项目采用 GitHub Actions 实现自动化 CI（代码质量检查）和 CD（自动部署至 GitHub Pages）。  
> 本文档面向**没有 CI/CD 经验的开发者**，包含完整的概念说明、操作步骤和常见问题。

---

## 📖 目录

1. [整体架构概览](#1-整体架构概览)
2. [核心流程图](#2-核心流程图)
3. [本地开发规范（代码提交流程）](#3-本地开发规范代码提交流程)
4. [Commitlint 提交信息规范](#4-commitlint-提交信息规范)
5. [分支策略](#5-分支策略)
6. [Pull Request（代码审核）流程](#6-pull-request代码审核流程)
7. [CI 自动化检查说明](#7-ci-自动化检查说明)
8. [CD 自动部署说明](#8-cd-自动部署说明)
9. [GitHub 仓库设置（首次接入必须做）](#9-github-仓库设置首次接入必须做)
10. [常见问题 FAQ](#10-常见问题-faq)

---

## 1. 整体架构概览

```
开发者本地
    │
    ▼
git commit  ──── Husky (pre-commit)  ──►  lint-staged 自动修复并检查代码格式
    │
    ▼
           ──── Husky (commit-msg)  ──►  Commitlint 校验提交信息规范
    │
    ▼
git push feat/xxx  ──►  创建 Pull Request ──►  CI 自动触发
                                                   │
                                                   ▼
                                          ✅ TypeScript 类型检查
                                          ✅ ESLint 代码规范检查
                                          ✅ 生产构建验证
                                                   │
                                              合并到 main
                                                   │
                                                   ▼
                                         CD 自动触发 ──► 构建 ──► 部署 GitHub Pages
```

---

## 2. 核心流程图

### 日常开发（功能分支）

```
main ─────────────────────────────────────────────────────► (生产)
  │                                                ▲
  │ checkout                                       │ merge (squash)
  ▼                                               │
feat/my-feature ──► commit ──► push ──► PR ──► Review ──► CI 通过 ──► merge
```

### CI/CD 触发时机

| 事件                                 | 触发的工作流                    |
| ------------------------------------ | ------------------------------- |
| push 到 `main`                       | CI 检查 + CD 自动部署           |
| push 到 `dev` / `feat/**` / `fix/**` | 仅 CI 检查                      |
| 向 `main` / `dev` 发起 PR            | 仅 CI 检查                      |
| 手动触发                             | 仅 CD 部署（workflow_dispatch） |

---

## 3. 本地开发规范（代码提交流程）

### 3.1 安装依赖（首次克隆后必须执行）

```bash
# 安装项目依赖（同时会自动执行 prepare 脚本，激活 Husky Git Hooks）
pnpm install
```

> ⚠️ **重要**：如果克隆后 `pnpm install` 没有激活 Husky，手动执行：
>
> ```bash
> pnpm exec husky
> ```

### 3.2 标准开发流程

```bash
# 第一步：从最新的 main 创建功能分支
git checkout main
git pull origin main
git checkout -b feat/your-feature-name

# 第二步：开发你的功能...
pnpm dev

# 第三步：提交代码
git add .
git commit -m "feat: 添加用户登录功能"
# ↑ commit 时 Husky 会自动：
#   1. 执行 lint-staged（对暂存文件进行 ESLint + Prettier 检查修复）
#   2. 执行 commitlint（校验提交信息格式）

# 第四步：推送分支
git push origin feat/your-feature-name

# 第五步：在 GitHub 上创建 Pull Request
# 浏览器打开：https://github.com/你的用户名/big-screen-dashboard
# 点击 "Compare & pull request"
```

### 3.3 常用 Git 命令速查

```bash
# 查看当前分支状态
git status

# 查看提交历史
git log --oneline

# 将 main 最新内容合并到当前分支（保持同步）
git fetch origin
git rebase origin/main

# 撤销最后一次 commit（代码保留）
git reset --soft HEAD~1

# 暂存当前未完成的工作
git stash
git stash pop  # 恢复
```

---

## 4. Commitlint 提交信息规范

本项目强制执行 [Conventional Commits](https://www.conventionalcommits.org/zh-hans/) 格式：

### 格式

```
<type>(<scope>): <subject>

[可选 body]
[可选 footer]
```

### type 类型说明

| type       | 含义                     | 示例                           |
| ---------- | ------------------------ | ------------------------------ |
| `feat`     | 新功能                   | `feat: 添加数据导出功能`       |
| `fix`      | Bug 修复                 | `fix: 修复登录页表单校验失效`  |
| `docs`     | 文档变更                 | `docs: 更新 README 部署说明`   |
| `style`    | 代码格式（不影响逻辑）   | `style: 统一缩进格式`          |
| `refactor` | 重构（不含新功能或修复） | `refactor: 提取通用 hook`      |
| `perf`     | 性能优化                 | `perf: 减少无用 re-render`     |
| `test`     | 添加或修改测试           | `test: 添加登录组件单元测试`   |
| `chore`    | 构建/工具链变更          | `chore: 升级 vite 版本`        |
| `revert`   | 回滚                     | `revert: revert feat: xxx`     |
| `ci`       | CI/CD 配置变更           | `ci: 优化 GitHub Actions 缓存` |
| `build`    | 构建系统变更             | `build: 修改 vite 打包配置`    |

### scope（可选）

用于说明影响的范围，例如：

```
feat(dashboard): 添加折线图实时更新
fix(login): 修复密码框显示状态异常
chore(deps): 升级 antd 到 6.x
```

### ✅ 合法示例

```bash
git commit -m "feat: 添加大屏主题切换功能"
git commit -m "fix(auth): 修复 token 过期后未清除本地缓存的问题"
git commit -m "docs: 添加 CI/CD 部署指南"
git commit -m "chore: 升级 pnpm 版本"
```

### ❌ 非法示例（会被 commitlint 拒绝）

```bash
git commit -m "修改了一些东西"      # 没有 type
git commit -m "Fix: 修复 bug"       # type 大写
git commit -m "feat"                # 没有 subject
```

---

## 5. 分支策略

### 分支命名规范

| 分支类型 | 命名格式         | 示例                  |
| -------- | ---------------- | --------------------- |
| 主分支   | `main`           | `main`                |
| 开发分支 | `dev`            | `dev`                 |
| 功能分支 | `feat/<描述>`    | `feat/user-profile`   |
| Bug 修复 | `fix/<描述>`     | `fix/login-crash`     |
| 紧急修复 | `hotfix/<描述>`  | `hotfix/payment-fail` |
| 文档更新 | `docs/<描述>`    | `docs/api-guide`      |
| 发版分支 | `release/<版本>` | `release/1.2.0`       |

### 分支保护规则（需在 GitHub 仓库设置中配置）

**`main` 分支**（生产环境）：

- ✅ 禁止直接 push，必须通过 PR 合并
- ✅ 合并前必须通过所有 CI 检查
- ✅ 至少 1 名审核者 approve 才能合并
- ✅ 合并前需要分支与 main 保持最新（no stale）

---

## 6. Pull Request（代码审核）流程

### 6.1 创建 PR 的完整步骤

1. **推送功能分支**到 GitHub
2. 浏览器打开你的仓库 → 点击 **"Compare & pull request"**
3. **填写 PR 描述**（系统会自动加载 [PR 模板](./.github/PULL_REQUEST_TEMPLATE.md)）：
   - 说明本次变更内容
   - 关联 Issue（如有）
   - 勾选自检清单
4. 指定 **Reviewers**（审核者）
5. 等待 **CI 检查通过**（绿色 ✅）
6. 获得审核者 **Review Approved** 后合并

### 6.2 PR 审核规范（Reviewer）

审核时关注以下方面：

| 检查项     | 说明                       |
| ---------- | -------------------------- |
| 逻辑正确性 | 代码实现是否符合需求       |
| 代码可读性 | 命名是否清晰，逻辑是否易懂 |
| 副作用     | 改动是否会影响其他功能模块 |
| 安全性     | 有无 XSS、CSRF 等安全隐患  |
| 性能       | 有无明显的性能问题         |
| 测试覆盖   | 关键逻辑是否有对应测试     |

### 6.3 合并策略

推荐使用 **"Squash and merge"**，将功能分支的所有 commit 压缩成一个清晰的提交，保持 `main` 分支 commit 历史干净。

---

## 7. CI 自动化检查说明

CI 工作流位于 [.github/workflows/ci.yml](./.github/workflows/ci.yml)。

### 检查步骤（按顺序执行）

```
1. 检出代码          (actions/checkout@v4)
2. 安装 pnpm        (pnpm/action-setup@v4)
3. 配置 Node 20     (actions/setup-node@v4)
4. pnpm install     (--frozen-lockfile 确保依赖一致)
5. pnpm typecheck   (TypeScript 类型检查，0 错误才通过)
6. pnpm lint        (ESLint 代码规范，0 error 才通过)
7. pnpm build       (Vite 生产构建，编译失败则 CI 失败)
```

### 查看 CI 结果

1. 打开你的 GitHub 仓库 → **Actions** 标签页
2. 点击对应的 workflow run 查看详情
3. 展开各 step 查看日志

### CI 失败怎么办？

```bash
# 本地复现 CI 的检查流程：
pnpm typecheck   # 检查类型错误
pnpm lint        # 检查 ESLint 错误
pnpm lint:fix    # 自动修复可修复的 ESLint 错误
pnpm build       # 验证构建是否正常
```

---

## 8. CD 自动部署说明

CD 工作流位于 [.github/workflows/deploy.yml](./.github/workflows/deploy.yml)。

### 部署触发条件

当代码推送到 `main` 分支（包括 PR 合并）时，自动触发部署。

### 部署目标

**GitHub Pages** — 免费的静态站点托管服务。

部署成功后访问地址：

```
https://<你的GitHub用户名>.github.io/<仓库名>/
```

### 部署流程

```
push to main
    │
    ▼
    构建 (pnpm build)
    设置 VITE_APP_BASE=/big-screen-dashboard/
    │
    ▼
    打包 dist/ 目录
    │
    ▼
    部署到 GitHub Pages
    │
    ▼
    ✅ 线上可访问
```

### 手动触发部署

1. GitHub 仓库 → **Actions** 标签页
2. 左侧选择 "Deploy to GitHub Pages"
3. 点击 **"Run workflow"** → 选择 `main` 分支 → **Run**

---

## 9. GitHub 仓库设置（首次接入必须做）

### 9.1 将本地代码推送到 GitHub

```bash
# 1. 在 GitHub 上创建新仓库（不要勾选 Initialize this repository）
#    https://github.com/new
#    仓库名填: big-screen-dashboard

# 2. 在本地添加远程仓库
git remote add origin https://github.com/你的用户名/big-screen-dashboard.git

# 3. 推送代码
git push -u origin main
```

### 9.2 开启 GitHub Pages

1. 仓库页点击 **Settings**（设置）
2. 左侧菜单 → **Pages**
3. **Source** 选择 **"GitHub Actions"**
4. 保存

> 只需设置一次，之后每次推送 `main` 都会自动部署。

### 9.3 配置分支保护规则（强烈建议）

1. **Settings** → **Branches** → **Add branch protection rule**
2. Branch name pattern 填写 `main`
3. 勾选以下选项：
   - ✅ **Require a pull request before merging**（禁止直接 push main）
   - ✅ **Require status checks to pass before merging**（CI 通过才能合并）
     - 在搜索框输入 `代码质量检查` 并选中
   - ✅ **Require branches to be up to date before merging**（合并前需 rebase）
   - ✅ **Do not allow bypassing the above settings**（管理员也受限制）
4. **Save changes**

### 9.4 更新 CODEOWNERS

打开 [.github/CODEOWNERS](./.github/CODEOWNERS)，将所有 `@your-username` 替换为你实际的 GitHub 用户名：

```
*   @your-actual-github-username
```

---

## 10. 常见问题 FAQ

### Q: commit 时报错 "type must be one of..."

**A**: 提交信息不符合 Conventional Commits 规范。请检查 type 是否拼写正确，格式是否为 `type: subject`。

```bash
# ❌ 错误
git commit -m "更新代码"
# ✅ 正确
git commit -m "feat: 添加数据导出功能"
```

---

### Q: pre-commit 检查失败，ESLint 报错

**A**: lint-staged 检测到代码问题，先手动修复：

```bash
pnpm lint:fix    # 自动修复
pnpm lint        # 确认无报错后重新 commit
```

---

### Q: CI 通过了，但 Pages 部署后打开是空白页

**A**: 通常是 `base` 路径问题。检查 `vite.config.ts` 里的 `base` 配置是否与仓库名一致。  
CD workflow 里设置的是：

```
VITE_APP_BASE: /${{ github.event.repository.name }}/
```

这会自动读取仓库名，一般无需手动修改。

---

### Q: 我是仓库唯一管理员，CI 还会拦截我的直接 push 吗？

**A**: 这取决于分支保护规则的配置。如果勾选了 "Do not allow bypassing the above settings"，管理员也会被限制。建议所有合并都走 PR 流程，便于保留审核记录。

---

### Q: 如何跳过 Husky 检查（紧急情况）？

**A**: 使用 `--no-verify` 参数，但**强烈不建议**在正常开发中使用：

```bash
git commit -m "fix: 紧急修复" --no-verify
```

---

### Q: 每次 push 后 Actions 里的 CI 用多少资源？

**A**: GitHub 对公共仓库免费提供 Actions 额度。私有仓库每月有 2000 分钟免费额度，本项目每次 CI 约耗时 2-3 分钟，日常使用完全够用。

---

## 📁 新增文件一览

```
项目根目录/
├── commitlint.config.js          # Commitlint 提交规范配置
├── vite.config.ts                # 已添加 VITE_APP_BASE 环境变量支持
├── package.json                  # 已添加 lint-staged 配置和 typecheck 命令
├── .husky/
│   ├── pre-commit               # commit 前执行 lint-staged
│   └── commit-msg               # commit 后执行 commitlint
└── .github/
    ├── workflows/
    │   ├── ci.yml               # CI：类型检查 + ESLint + 构建验证
    │   └── deploy.yml           # CD：自动部署至 GitHub Pages
    ├── ISSUE_TEMPLATE/
    │   ├── bug_report.yml       # Bug 报告 Issue 模板
    │   └── feature_request.yml  # 功能需求 Issue 模板
    ├── PULL_REQUEST_TEMPLATE.md  # PR 描述模板
    └── CODEOWNERS               # 代码 Review 负责人配置
```
