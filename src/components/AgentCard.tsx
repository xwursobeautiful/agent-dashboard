import React from 'react';
import { Agent } from '../types';
import { StatusBadge } from './StatusBadge';
import { Play, Pause, Square } from 'lucide-react';

interface AgentCardProps {
  agent: Agent;
  isSelected: boolean;
  onSelect: () => void;
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
}

export const AgentCard: React.FC<AgentCardProps> = ({
  agent,
  isSelected,
  onSelect,
  onStart,
  onPause,
  onStop,
}) => {
  const canStart = agent.status === 'idle' || agent.status === 'done';
  const canPause = agent.status === 'running';
  const canStop = agent.status === 'running' || agent.status === 'waiting';

  return (
    <div
      onClick={onSelect}
      className={`
        p-4 rounded-lg border-2 cursor-pointer transition-all
        ${isSelected
          ? 'border-blue-500 bg-slate-800'
          : 'border-slate-700 bg-slate-900 hover:border-slate-600'
        }
      `}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <StatusBadge status={agent.status} />
            <h3 className="text-white font-semibold">{agent.name}</h3>
          </div>
          <p className="text-xs text-slate-400">{agent.role}</p>
        </div>
      </div>

      {agent.currentTask && (
        <div className="mb-3">
          <p className="text-sm text-slate-300 mb-1">{agent.currentTask}</p>
          {agent.progress !== undefined && (
            <div className="w-full bg-slate-700 rounded-full h-1.5">
              <div
                className="bg-blue-500 h-1.5 rounded-full transition-all"
                style={{ width: `${agent.progress}%` }}
              />
            </div>
          )}
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400">
          {agent.taskCount} 个任务
        </span>

        <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={onStart}
            disabled={!canStart}
            className={`
              p-1.5 rounded transition-colors
              ${canStart
                ? 'hover:bg-green-500/20 text-green-400'
                : 'text-slate-600 cursor-not-allowed'
              }
            `}
            title="启动"
          >
            <Play className="w-4 h-4" />
          </button>
          <button
            onClick={onPause}
            disabled={!canPause}
            className={`
              p-1.5 rounded transition-colors
              ${canPause
                ? 'hover:bg-yellow-500/20 text-yellow-400'
                : 'text-slate-600 cursor-not-allowed'
              }
            `}
            title="暂停"
          >
            <Pause className="w-4 h-4" />
          </button>
          <button
            onClick={onStop}
            disabled={!canStop}
            className={`
              p-1.5 rounded transition-colors
              ${canStop
                ? 'hover:bg-red-500/20 text-red-400'
                : 'text-slate-600 cursor-not-allowed'
              }
            `}
            title="停止"
          >
            <Square className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
