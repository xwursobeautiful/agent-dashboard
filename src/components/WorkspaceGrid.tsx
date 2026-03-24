import React from 'react';
import { Agent } from '../types';
import { StatusBadge } from './StatusBadge';

interface WorkspaceGridProps {
  agents: Agent[];
  selectedAgentId: string;
  onSelectAgent: (id: string) => void;
}

export const WorkspaceGrid: React.FC<WorkspaceGridProps> = ({
  agents,
  selectedAgentId,
  onSelectAgent,
}) => {
  return (
    <div className="flex-1 bg-slate-950 p-6 overflow-y-auto scrollbar-thin">
      <h2 className="text-xl font-semibold text-white mb-6">可视化工作区</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {agents.map((agent) => (
          <div
            key={agent.id}
            onClick={() => onSelectAgent(agent.id)}
            className={`
              p-6 rounded-xl border-2 cursor-pointer transition-all
              ${selectedAgentId === agent.id
                ? 'border-blue-500 bg-slate-800 shadow-lg shadow-blue-500/20'
                : 'border-slate-700 bg-slate-900 hover:border-slate-600'
              }
              ${agent.status === 'running' ? 'animate-pulse-slow' : ''}
            `}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`
                w-12 h-12 rounded-lg flex items-center justify-center text-2xl
                ${getStatusBgColor(agent.status)}
              `}>
                {getAgentIcon(agent.role)}
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold">{agent.name}</h3>
                <p className="text-xs text-slate-400">{agent.role}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">状态</span>
                <StatusBadge status={agent.status} showText />
              </div>

              {agent.currentTask && (
                <div>
                  <span className="text-sm text-slate-400">任务</span>
                  <p className="text-sm text-slate-200 mt-1">{agent.currentTask}</p>
                </div>
              )}

              {agent.progress !== undefined && agent.progress > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-slate-400">进度</span>
                    <span className="text-sm text-slate-300">{agent.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${getProgressColor(agent.status)}`}
                      style={{ width: `${agent.progress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-slate-700">
                <span className="text-xs text-slate-500">任务数</span>
                <span className="text-sm font-semibold text-slate-300">{agent.taskCount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function getAgentIcon(role: string): string {
  const icons: Record<string, string> = {
    data_analyst: '📊',
    content_generator: '✍️',
    test_executor: '🧪',
    code_reviewer: '👀',
    deploy_manager: '🚀',
  };
  return icons[role] || '🤖';
}

function getStatusBgColor(status: string): string {
  const colors: Record<string, string> = {
    idle: 'bg-slate-700',
    running: 'bg-green-500/20',
    waiting: 'bg-yellow-500/20',
    error: 'bg-red-500/20',
    done: 'bg-blue-500/20',
  };
  return colors[status] || 'bg-slate-700';
}

function getProgressColor(status: string): string {
  const colors: Record<string, string> = {
    running: 'bg-green-500',
    waiting: 'bg-yellow-500',
    error: 'bg-red-500',
    done: 'bg-blue-500',
  };
  return colors[status] || 'bg-slate-500';
}
