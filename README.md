# Agent Visual Dashboard

一个可交互的 Agent 可视化工作状态页面，用于管理和监控多个 AI Agent 的运行状态。

## 功能特性

- ✅ 多 Agent 管理与状态监控
- ✅ 实时可视化工作区
- ✅ 详细的执行面板（步骤、工具调用、日志）
- ✅ 任务派发与管理
- ✅ Agent 创建与控制（启动/暂停/停止）
- ✅ 响应式设计
- ✅ 完整的 Mock 数据

## 技术栈

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Lucide React (图标)

## 快速开始

### 安装依赖

```bash
npm install
# 或
pnpm install
```

### 启动开发服务器

```bash
npm run dev
# 或
pnpm dev
```

访问 http://localhost:5173

### 构建生产版本

```bash
npm run build
# 或
pnpm build
```

## 项目结构

```
agent-dashboard/
├── src/
│   ├── components/          # React 组件
│   │   ├── Header.tsx       # 顶部状态栏
│   │   ├── AgentList.tsx    # 左侧 Agent 列表
│   │   ├── AgentCard.tsx    # Agent 卡片组件
│   │   ├── WorkspaceGrid.tsx # 中间可视化工作区
│   │   ├── ExecutionPanel.tsx # 右侧执行面板
│   │   ├── TaskInput.tsx    # 底部任务输入
│   │   ├── CreateAgentModal.tsx # 创建 Agent 弹窗
│   │   └── StatusBadge.tsx  # 状态徽章
│   ├── hooks/
│   │   └── useAgents.ts     # Agent 状态管理 Hook
│   ├── types/
│   │   └── index.ts         # TypeScript 类型定义
│   ├── data/
│   │   └── mockData.ts      # Mock 数据
│   ├── App.tsx              # 主应用组件
│   ├── main.tsx             # 应用入口
│   └── index.css            # 全局样式
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```

## 使用说明

### Agent 状态

- **空闲 (idle)**: 灰色，Agent 未执行任务
- **运行中 (running)**: 绿色脉冲，Agent 正在执行任务
- **等待中 (waiting)**: 黄色脉冲，Agent 等待依赖
- **错误 (error)**: 红色，Agent 执行出错
- **已完成 (done)**: 蓝色，Agent 完成任务

### 交互功能

1. **查看 Agent 详情**: 点击左侧列表或中间工作区的 Agent 卡片
2. **控制 Agent**: 使用启动/暂停/停止按钮
3. **创建 Agent**: 点击左侧列表顶部的 + 按钮
4. **派发任务**: 在底部输入框选择 Agent 并输入任务描述
5. **查看执行日志**: 右侧面板展示详细的执行信息

## 自定义开发

### 添加新的 Agent 角色

编辑 `src/components/CreateAgentModal.tsx` 中的 `roleOptions`：

```typescript
const roleOptions = [
  { value: 'your_role', label: '你的角色名称' },
  // ...
];
```

### 修改 Mock 数据

编辑 `src/data/mockData.ts` 添加或修改 Agent 和任务数据。

### 接入真实 API

修改 `src/hooks/useAgents.ts`，将 Mock 数据替换为 API 调用。

## License

MIT
