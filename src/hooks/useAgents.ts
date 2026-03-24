import { useState, useCallback } from 'react';
import { Agent, AgentStatus, Task } from '../types';
import { mockAgents, mockTasks } from '../data/mockData';

export const useAgents = () => {
  const [agents, setAgents] = useState<Agent[]>(mockAgents);
  const [selectedAgentId, setSelectedAgentId] = useState<string>(mockAgents[0].id);
  const [tasks] = useState<Record<string, Task>>(mockTasks);

  const selectedAgent = agents.find(a => a.id === selectedAgentId);
  const selectedTask = selectedAgentId ? tasks[selectedAgentId] : undefined;

  const updateAgentStatus = useCallback((agentId: string, status: AgentStatus) => {
    setAgents(prev =>
      prev.map(agent =>
        agent.id === agentId ? { ...agent, status } : agent
      )
    );
  }, []);

  const addAgent = useCallback((name: string, role: string) => {
    const newAgent: Agent = {
      id: `agent_${Date.now()}`,
      name,
      role,
      status: 'idle',
      taskCount: 0,
      createdAt: new Date().toISOString(),
    };
    setAgents(prev => [...prev, newAgent]);
  }, []);

  const startAgent = useCallback((agentId: string) => {
    updateAgentStatus(agentId, 'running');
  }, [updateAgentStatus]);

  const pauseAgent = useCallback((agentId: string) => {
    updateAgentStatus(agentId, 'waiting');
  }, [updateAgentStatus]);

  const stopAgent = useCallback((agentId: string) => {
    updateAgentStatus(agentId, 'idle');
  }, [updateAgentStatus]);

  const stats = {
    total: agents.length,
    running: agents.filter(a => a.status === 'running').length,
    error: agents.filter(a => a.status === 'error').length,
    completed: agents.reduce((sum, a) => sum + a.taskCount, 0),
  };

  return {
    agents,
    selectedAgent,
    selectedTask,
    selectedAgentId,
    setSelectedAgentId,
    addAgent,
    startAgent,
    pauseAgent,
    stopAgent,
    stats,
  };
};
