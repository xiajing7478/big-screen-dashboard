# Big Screen Dashboard — 项目规范

## 项目概述

大屏数据可视化平台，基于 React 19 + TypeScript + Vite 构建，专为 1920×1080 大屏展示场景设计。

## 技术栈

| 类别     | 技术               | 版本 |
| -------- | ------------------ | ---- |
| 框架     | React              | ^19  |
| 语言     | TypeScript         | ~5.9 |
| 构建     | Vite               | ^8   |
| UI 组件  | Ant Design         | ^6   |
| 状态管理 | Zustand            | ^5   |
| 路由     | React Router DOM   | ^7   |
| 样式     | Less (CSS Modules) | ^4   |
| 代码规范 | ESLint + Prettier  | -    |
| 包管理   | pnpm               | -    |

## 目录结构

```
src/
├── assets/              # 静态资源
├── components/          # 公共组件
│   └── ProtectedRoute.tsx  # 路由鉴权组件
├── pages/               # 页面组件（每个页面一个文件夹）
│   ├── Login/
│   │   ├── index.tsx
│   │   └── index.module.less
│   └── Dashboard/
│       ├── index.tsx
│       └── index.module.less
│       ├── index.tsx
│       └── index.module.css
├── router/
│   └── index.tsx        # 路由配置（createBrowserRouter）
├── store/
│   └── useAuthStore.ts  # 认证状态（Zustand + persist）
├── App.tsx              # 根组件（RouterProvider）
├── main.tsx             # 入口文件
└── index.less           # 全局基础样式 + Less 变量
```

## 路由规范

- 使用 `createBrowserRouter` + `RouterProvider` 模式（React Router DOM v7）
- 受保护路由通过 `ProtectedRoute` 组件（`<Outlet />`）统一管理
- 未登录访问受保护路由自动重定向到 `/login`
- 路由定义集中在 `src/router/index.tsx`

## 状态管理规范

- 使用 Zustand，所有 store 文件放在 `src/store/` 目录
- 命名规范：`use[Name]Store.ts`（如 `useAuthStore.ts`）
- 需要持久化的 store 使用 `zustand/middleware` 的 `persist` 中间件，存储至 `localStorage`
- 认证状态（`useAuthStore`）：包含 `isAuthenticated`、`userInfo`、`login()`、`logout()`

## 认证 & Mock 数据

- 当前为 Mock 登录，用户数据硬编码在 `src/pages/Login/index.tsx` 的 `MOCK_USERS` 中
- Mock 账号：`admin / 123456`、`user / 123456`
- 登录成功后状态通过 Zustand persist 持久化，刷新页面不会退出登录

## 样式规范

- 全局使用深色大屏主题（`background: #0a0e1a`，主色 `#00b4ff`/`#00d4ff`）
- 使用 **Less** + CSS Modules（`*.module.less`）避免样式污染
- 全局 Less 变量定义在 `src/index.less`，各模块通过 `@import` 引入复用
- Ant Design 组件统一使用 `darkAlgorithm` + 自定义 token
- 禁止使用内联样式处理布局，统一在 Less Module 中定义

## 代码规范

- ESLint：负责代码质量检查（TypeScript、React Hooks 规则等）
- Prettier：负责代码格式化，配置见 `.prettierrc`
- 两者通过 `eslint-plugin-prettier` + `eslint-config-prettier` 集成，格式问题以 ESLint warning 形式报出
- 格式规范：单引号、无分号、2 空格缩进、行宽 100、末尾逗号

## 大屏适配

- 设计尺寸基准：1920 × 1080
- `html/body/#root` 设置 `width: 100%; height: 100%; overflow: hidden`
- 后续大屏缩放适配推荐使用 CSS `transform: scale()` 方案，封装为 `ScaleWrapper` 组件

## 换肤功能方案

### 目标

实现一个换肤功能，支持用户在深色主题和浅色主题之间切换，并支持通过配置文件扩展更多主题。

### 实现步骤

1. **状态管理**：
   - 使用 Zustand 创建一个 `useThemeStore`，存储当前主题和切换主题的方法。
   - 将主题状态持久化到 `localStorage`，确保页面刷新后主题保持一致。

2. **主题配置**：
   - 在 `src/themes` 目录下创建一个 `themes.ts` 文件，定义所有主题的配置信息。
   - 每个主题包含颜色变量（如 `colorPrimary`、`colorBgContainer` 等）。

3. **全局样式**：
   - 修改 `index.less`，使用 Less 变量动态应用主题。
   - 通过 Zustand 的主题状态动态切换 Less 变量。

4. **UI 集成**：
   - 在页面顶部添加一个主题切换按钮，调用 `useThemeStore` 的切换方法。
   - 使用 Ant Design 的 `ConfigProvider` 动态应用主题。

5. **代码示例**：
   - Zustand 状态管理：`src/store/useThemeStore.ts`
   - 主题配置：`src/themes/themes.ts`
   - 全局样式：`src/index.less`

### 未来扩展

- 支持用户自定义主题，通过 UI 配置颜色并保存。
- 支持更多主题切换动画效果。

### 开发命令

```bash
pnpm dev        # 启动开发服务器
pnpm build      # 类型检查 + 生产构建
pnpm preview    # 预览生产包
pnpm lint       # ESLint 检查
pnpm lint:fix   # ESLint 自动修复
pnpm format     # Prettier 格式化所有文件
```
