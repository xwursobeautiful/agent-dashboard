import React from 'react';
import { Agent } from '../types';
import { AgentCard } from './AgentCard';
import { Plus } from 'lucide-react';

interface AgentListProps {
  agents: Agent[];
  selectedAgentId: string;
  onSelectAgent: (id: string) => void;
  onStartAgent: (id: string) => void;
  onPauseAgent: (id: string) => void;
  onStopAgent: (id: string) => void;
  onCreateAgent: () => void;
}

export const AgentList: React.FC<AgentListProps> = ({
  agents,
  selectedAgentId,
  onSelectAgent,
  onStartAgent,
  onPauseAgent,
  onStopAgent,
  onCreateAgent,
}) => {
  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 p-4 overflow-y-auto scrollbar-thin">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Agent 列表</h2>
        <button
          onClick={onCreateAgent}
          className="p-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
          title="新建 Agent"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3">
        {agents.map((agent) => (
          <AgentCard
            key={agent.id}
            agent={agent}
            isSelected={agent.id === selectedAgentId}
            onSelect={() => onSelectAgent(agent.id)}
            onStart={() => onStartAgent(agent.id)}
            onPause={() => onPauseAgent(agent.id)}
            onStop={() => onStopAgent(agent.id)}
          />
        ))}
      </div>
    </div>
  );
};
