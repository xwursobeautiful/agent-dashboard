import React from 'react';
import { AgentStatus } from '../types';

interface StatusBadgeProps {
  status: AgentStatus;
  showText?: boolean;
}

const statusConfig: Record<AgentStatus, { color: string; text: string; icon: string; animate?: string }> = {
  idle: {
    color: 'bg-slate-500',
    text: '空闲',
    icon: '○',
  },
  running: {
    color: 'bg-green-500',
    text: '运行中',
    icon: '●',
    animate: 'animate-pulse',
  },
  waiting: {
    color: 'bg-yellow-500',
    text: '等待中',
    icon: '⏸',
    animate: 'animate-pulse-slow',
  },
  error: {
    color: 'bg-red-500',
    text: '错误',
    icon: '✕',
  },
  done: {
    color: 'bg-blue-500',
    text: '已完成',
    icon: '✓',
  },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, showText = false }) => {
  const config = statusConfig[status];

  return (
    <div className="flex items-center gap-2">
      <span
        className={`inline-block w-2 h-2 rounded-full ${config.color} ${config.animate || ''}`}
      />
      {showText && (
        <span className="text-sm text-slate-300">{config.text}</span>
      )}
    </div>
  );
};
