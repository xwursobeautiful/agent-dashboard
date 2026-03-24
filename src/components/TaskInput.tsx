import React, { useState } from 'react';
import { Agent } from '../types';
import { Send } from 'lucide-react';

interface TaskInputProps {
  agents: Agent[];
  selectedAgentId: string;
  onSelectAgent: (id: string) => void;
}

export const TaskInput: React.FC<TaskInputProps> = ({
  agents,
  selectedAgentId,
  onSelectAgent,
}) => {
  const [taskInput, setTaskInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskInput.trim()) return;

    // 这里可以添加发送任务的逻辑
    console.log('发送任务:', { agentId: selectedAgentId, task: taskInput });
    
    // 显示提示
    alert(`任务已发送给 ${agents.find(a => a.id === selectedAgentId)?.name}`);
    
    // 清空输入
    setTaskInput('');
  };

  return (
    <div className="bg-slate-900 border-t border-slate-800 p-4">
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <select
          value={selectedAgentId}
          onChange={(e) => onSelectAgent(e.target.value)}
          className="px-4 py-2 bg-slate-800 text-white rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500 transition-colors"
        >
          {agents.map((agent) => (
            <option key={agent.id} value={agent.id}>
              {agent.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="输入任务描述..."
          className="flex-1 px-4 py-2 bg-slate-800 text-white rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500 transition-colors placeholder-slate-500"
        />

        <button
          type="submit"
          disabled={!taskInput.trim()}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          发送
        </button>
      </form>
    </div>
  );
};
