export type AgentStatus = 'idle' | 'running' | 'waiting' | 'error' | 'done';

export interface Agent {
  id: string;
  name: string;
  role: string;
  status: AgentStatus;
  taskCount: number;
  currentTask?: string;
  progress?: number;
  createdAt: string;
}

export interface TaskStep {
  id: string;
  name: string;
  status: 'completed' | 'running' | 'pending' | 'failed';
  startTime?: string;
  endTime?: string;
  duration?: number;
}

export interface ToolCall {
  id: string;
  name: string;
  params?: Record<string, any>;
  result?: any;
  duration: number;
  status: 'success' | 'running' | 'failed';
  timestamp: string;
}

export interface LogEntry {
  id: string;
  level: 'info' | 'warn' | 'error';
  message: string;
  timestamp: string;
}

export interface Task {
  id: string;
  agentId: string;
  description: string;
  steps: TaskStep[];
  toolCalls: ToolCall[];
  logs: LogEntry[];
  input?: any;
  output?: any;
  startTime: string;
  endTime?: string;
}
