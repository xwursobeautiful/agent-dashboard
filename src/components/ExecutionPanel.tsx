import React, { useState } from 'react';
import { Agent, Task } from '../types';
import { CheckCircle2, Circle, Loader2, XCircle, ChevronDown, ChevronRight } from 'lucide-react';

interface ExecutionPanelProps {
  agent?: Agent;
  task?: Task;
}

export const ExecutionPanel: React.FC<ExecutionPanelProps> = ({ agent, task }) => {
  const [expandedSections, setExpandedSections] = useState({
    steps: true,
    tools: true,
    logs: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  if (!agent) {
    return (
      <div className="w-96 bg-slate-900 border-l border-slate-800 p-6 flex items-center justify-center">
        <p className="text-slate-400">请选择一个 Agent</p>
      </div>
    );
  }

  return (
    <div className="w-96 bg-slate-900 border-l border-slate-800 overflow-y-auto scrollbar-thin">
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white mb-2">执行面板</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">当前 Agent:</span>
            <span className="text-sm text-white font-medium">{agent.name}</span>
          </div>
        </div>

        {!task ? (
          <div className="text-center py-8">
            <p className="text-slate-400">暂无执行任务</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* 任务描述 */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-2">任务描述</h3>
              <p className="text-sm text-slate-300">{task.description}</p>
            </div>

            {/* 执行步骤 */}
            <div>
              <button
                onClick={() => toggleSection('steps')}
                className="flex items-center gap-2 text-sm font-semibold text-white mb-3 hover:text-blue-400 transition-colors"
              >
                {expandedSections.steps ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                执行步骤
              </button>
              {expandedSections.steps && (
                <div className="space-y-2">
                  {task.steps.map((step, index) => (
                    <div key={step.id} className="flex items-start gap-3 p-3 bg-slate-800 rounded-lg">
                      <div className="mt-0.5">
                        {step.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-green-400" />}
                        {step.status === 'running' && <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />}
                        {step.status === 'pending' && <Circle className="w-4 h-4 text-slate-500" />}
                        {step.status === 'failed' && <XCircle className="w-4 h-4 text-red-400" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-white">{index + 1}. {step.name}</p>
                        {step.duration && (
                          <p className="text-xs text-slate-400 mt-1">耗时: {step.duration}s</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 工具调用 */}
            {task.toolCalls.length > 0 && (
              <div>
                <button
                  onClick={() => toggleSection('tools')}
                  className="flex items-center gap-2 text-sm font-semibold text-white mb-3 hover:text-blue-400 transition-colors"
                >
                  {expandedSections.tools ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  工具调用记录
                </button>
                {expandedSections.tools && (
                  <div className="space-y-2">
                    {task.toolCalls.map((tool) => (
                      <div key={tool.id} className="p-3 bg-slate-800 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-white">{tool.name}</span>
                          <span className={`text-xs px-2 py-0.5 rounded ${
                            tool.status === 'success' ? 'bg-green-500/20 text-green-400' :
                            tool.status === 'running' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {tool.status}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400">
                          <div>耗时: {tool.duration}s</div>
                          <div className="mt-1">{new Date(tool.timestamp).toLocaleTimeString()}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 日志 */}
            {task.logs.length > 0 && (
              <div>
                <button
                  onClick={() => toggleSection('logs')}
                  className="flex items-center gap-2 text-sm font-semibold text-white mb-3 hover:text-blue-400 transition-colors"
                >
                  {expandedSections.logs ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  执行日志
                </button>
                {expandedSections.logs && (
                  <div className="space-y-1 max-h-64 overflow-y-auto scrollbar-thin">
                    {task.logs.map((log) => (
                      <div key={log.id} className="p-2 bg-slate-800 rounded text-xs">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-1.5 py-0.5 rounded font-medium ${
                            log.level === 'error' ? 'bg-red-500/20 text-red-400' :
                            log.level === 'warn' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}>
                            {log.level.toUpperCase()}
                          </span>
                          <span className="text-slate-500">
                            {new Date(log.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-slate-300">{log.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 输入输出 */}
            {(task.input || task.output) && (
              <div className="space-y-3">
                {task.input && (
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-2">输入</h3>
                    <pre className="text-xs text-slate-300 bg-slate-800 p-3 rounded-lg overflow-x-auto scrollbar-thin">
                      {JSON.stringify(task.input, null, 2)}
                    </pre>
                  </div>
                )}
                {task.output && (
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-2">输出</h3>
                    <pre className="text-xs text-slate-300 bg-slate-800 p-3 rounded-lg overflow-x-auto scrollbar-thin">
                      {JSON.stringify(task.output, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
