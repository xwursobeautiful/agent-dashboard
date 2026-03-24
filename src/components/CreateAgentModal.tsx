import React, { useState } from 'react';
import { X } from 'lucide-react';

interface CreateAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, role: string) => void;
}

const roleOptions = [
  { value: 'data_analyst', label: '数据分析师' },
  { value: 'content_generator', label: '内容生成器' },
  { value: 'test_executor', label: '测试执行器' },
  { value: 'code_reviewer', label: '代码审查员' },
  { value: 'deploy_manager', label: '部署管理器' },
  { value: 'custom', label: '自定义' },
];

export const CreateAgentModal: React.FC<CreateAgentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('data_analyst');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSubmit(name, role);
    setName('');
    setRole('data_analyst');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-900 rounded-xl p-6 w-full max-w-md border border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">创建新 Agent</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-800 rounded transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Agent 名称 *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例如: 数据分析师"
              className="w-full px-4 py-2 bg-slate-800 text-white rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500 transition-colors placeholder-slate-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              角色类型 *
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800 text-white rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500 transition-colors"
            >
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              创建
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
