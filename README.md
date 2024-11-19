# Daily TodoList

一个支持多人协作的待办事项管理应用。

## 功能特点

- 多人协作：支持多用户添加和管理任务
- 任务分组：按用户和日期分组显示任务
- 周统计：展示每个用户的任务完成情况
- 实时更新：任务状态实时同步
- 响应式设计：支持移动端和桌面端

## 技术栈

### 前端
- React 18
- React Router v6
- Vite
- date-fns

### 后端
- Koa2
- @koa/router
- koa-static
- koa-bodyparser

## 项目结构 

## Deployment

### Backend (Railway)
1. Create a new project on Railway
2. Connect your GitHub repository
3. Railway will automatically detect the `railway.toml` configuration
4. Set required environment variables in Railway dashboard

### Frontend (GitHub Pages)
1. Enable GitHub Pages in repository settings
2. Set the source branch to `gh-pages`
3. Add the following secrets in GitHub repository settings:
   - `VITE_API_URL`: Your Railway backend URL

## Development

### Backend