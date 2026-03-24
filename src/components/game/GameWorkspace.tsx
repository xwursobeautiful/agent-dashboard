import React, { useState } from 'react';
import { Bot, Cpu, Zap, Shield, Activity, X, ChevronDown, ChevronUp, GripVertical } from 'lucide-react';
import { ThemeProvider } from '../../context/ThemeContext';
import {
  GamePanel,
  GameButton,
  GameProgress,
  GameXPBar,
  GameStatus,
  GameHealthBar,
  GameResourceBar,
  AchievementGrid,
  GameIcon,
  GameIconBadge,
  GameIconGroup,
  GameTooltip,
  GameStatTooltip,
  ThemeSettings,
  Achievement,
} from './index';

interface AgentGameData {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'busy' | 'idle' | 'offline';
  hp: number;
  maxHp: number;
  shield: number;
  xp: number;
  maxXp: number;
  level: number;
  cpu: number;
  memory: number;
  tasks: number;
  efficiency: number;
}

const mockAgents: AgentGameData[] = [
  {
    id: '1',
    name: '数据分析师',
    type: 'analytics',
    status: 'active',
    hp: 85,
    maxHp: 100,
    shield: 15,
    xp: 750,
    maxXp: 1000,
    level: 5,
    cpu: 72,
    memory: 64,
    tasks: 12,
    efficiency: 94,
  },
  {
    id: '2',
    name: '代码助手',
    type: 'code',
    status: 'busy',
    hp: 60,
    maxHp: 100,
    shield: 0,
    xp: 420,
    maxXp: 500,
    level: 3,
    cpu: 95,
    memory: 88,
    tasks: 8,
    efficiency: 87,
  },
  {
    id: '3',
    name: '内容创作',
    type: 'content',
    status: 'idle',
    hp: 100,
    maxHp: 100,
    shield: 30,
    xp: 1200,
    maxXp: 1500,
    level: 7,
    cpu: 45,
    memory: 52,
    tasks: 24,
    efficiency: 98,
  },
];

const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: '初次部署',
    description: '成功创建并启动你的第一个AI代理',
    icon: 'zap',
    unlocked: true,
    progress: 1,
    maxProgress: 1,
    reward: '+100 XP',
    rarity: 'common',
  },
  {
    id: '2',
    title: '高效工作者',
    description: '完成10个任务且效率超过90%',
    icon: 'target',
    unlocked: true,
    progress: 10,
    maxProgress: 10,
    reward: '+500 XP',
    rarity: 'rare',
  },
  {
    id: '3',
    title: '团队领袖',
    description: '同时管理5个活跃的AI代理',
    icon: 'crown',
    unlocked: false,
    progress: 3,
    maxProgress: 5,
    rarity: 'epic',
  },
  {
    id: '4',
    title: '传奇大师',
    description: '达到10级并解锁所有技能',
    icon: 'trophy',
    unlocked: false,
    progress: 5,
    maxProgress: 10,
    reward: '传奇称号',
    rarity: 'legendary',
  },
];

export const GameWorkspace: React.FC = () => {
  const [selectedAgentId, setSelectedAgentId] = useState<string>('1');
  const [showSettings, setShowSettings] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [agentsExpanded, setAgentsExpanded] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  const selectedAgent = mockAgents.find(a => a.id === selectedAgentId);

  const handleDragStart = (e: React.DragEvent, agentId: string) => {
    setIsDragging(true);
    e.dataTransfer.setData('agentId', agentId);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <ThemeProvider>
      <div className="h-screen flex flex-col game-grid-bg" style={{ backgroundColor: 'var(--game-bg-primary)' }}>
        {/* Header */}
        <header className="game-panel !rounded-none !border-t-0 !border-l-0 !border-r-0 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="game-level-badge !text-base !px-4 !py-1">Lv.12</div>
                <div>
                  <h1 className="text-2xl font-bold text-[var(--game-text-primary)] game-glow-text">
                    指挥中心
                  </h1>
                  <p className="text-sm text-[var(--game-text-muted)]">AI代理管理系统</p>
                </div>
              </div>
              <GameXPBar
                current={2450}
                max={3000}
                level={12}
                className="w-64"
              />
            </div>

            <div className="flex items-center gap-3">
              <GameStatTooltip
                title="总代理数"
                value={mockAgents.length}
                description="活跃代理数量"
                trend="up"
                trendValue="+2 本周"
              >
                <GameIconBadge icon="bot" count={mockAgents.length} variant="primary" />
              </GameStatTooltip>

              <GameStatTooltip
                title="任务完成"
                value={44}
                description="本周完成数"
                trend="up"
                trendValue="+12%"
              >
                <GameIconBadge icon="target" count={44} variant="success" />
              </GameStatTooltip>

              <GameTooltip content="成就系统">
                <GameIcon
                  type="trophy"
                  variant="warning"
                  onClick={() => setShowAchievements(!showAchievements)}
                  glow
                />
              </GameTooltip>

              <GameTooltip content="设置">
                <GameIcon
                  type="cpu"
                  variant="info"
                  onClick={() => setShowSettings(!showSettings)}
                />
              </GameTooltip>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Agent List */}
          <div className="w-80 border-r border-[var(--game-border)] overflow-y-auto game-scrollbar">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-[var(--game-text-primary)] flex items-center gap-2">
                  <Bot size={20} className="text-[var(--game-accent-primary)]" />
                  我的代理
                </h2>
                <button
                  onClick={() => setAgentsExpanded(!agentsExpanded)}
                  className="p-1 hover:bg-[var(--game-bg-tertiary)] rounded transition-colors"
                >
                  {agentsExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
              </div>

              {agentsExpanded && (
                <div className="space-y-3">
                  {mockAgents.map((agent) => (
                    <div
                      key={agent.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, agent.id)}
                      onDragEnd={handleDragEnd}
                      onClick={() => setSelectedAgentId(agent.id)}
                      className={`
                        game-card cursor-grab
                        ${selectedAgentId === agent.id ? 'selected ring-2 ring-[var(--game-accent-primary)]' : ''}
                        ${isDragging ? 'opacity-50 scale-95' : ''}
                      `}
                    >
                      <div className="flex items-start gap-3">
                        <div className="cursor-grab" onClick={(e) => e.stopPropagation()}>
                          <GripVertical size={16} className="text-[var(--game-text-muted)]" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-[var(--game-text-primary)]">
                                {agent.name}
                              </h3>
                              <GameIconBadge
                                icon={agent.type === 'analytics' ? 'target' : agent.type === 'code' ? 'code' : 'sparkles'}
                                size="sm"
                                variant={agent.status === 'active' ? 'success' : agent.status === 'busy' ? 'warning' : 'default'}
                              />
                            </div>
                            <GameLevelBadge level={agent.level} />
                          </div>

                          <GameStatus status={agent.status} showDot size="sm" className="mb-2" />

                          <div className="space-y-1.5">
                            <GameResourceBar
                              icon={<Cpu size={12} />}
                              value={agent.cpu}
                              max={100}
                              color="var(--game-accent-primary)"
                              label="CPU"
                            />
                            <GameResourceBar
                              icon={<Activity size={12} />}
                              value={agent.memory}
                              max={100}
                              color="var(--game-accent-success)"
                              label="内存"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Center Panel - Main Workspace */}
          <div className="flex-1 overflow-y-auto game-scrollbar p-6">
            <div className="max-w-6xl mx-auto">
              {selectedAgent && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Agent Detail Card */}
                  <GamePanel
                    title={selectedAgent.name}
                    icon={<Bot size={20} />}
                    glow
                  >
                    <div className="space-y-6">
                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="game-card !p-3 text-center">
                          <div className="text-2xl font-bold text-[var(--game-accent-primary)]">
                            {selectedAgent.tasks}
                          </div>
                          <div className="text-xs text-[var(--game-text-muted)] mt-1">任务数</div>
                        </div>
                        <div className="game-card !p-3 text-center">
                          <div className="text-2xl font-bold text-[var(--game-accent-success)]">
                            {selectedAgent.efficiency}%
                          </div>
                          <div className="text-xs text-[var(--game-text-muted)] mt-1">效率</div>
                        </div>
                        <div className="game-card !p-3 text-center">
                          <div className="text-2xl font-bold text-[var(--game-accent-warning)]">
                            Lv.{selectedAgent.level}
                          </div>
                          <div className="text-xs text-[var(--game-text-muted)] mt-1">等级</div>
                        </div>
                      </div>

                      {/* Health Bar */}
                      <GameHealthBar
                        current={selectedAgent.hp}
                        max={selectedAgent.maxHp}
                        shield={selectedAgent.shield}
                      />

                      {/* XP Bar */}
                      <GameXPBar
                        current={selectedAgent.xp}
                        max={selectedAgent.maxXp}
                        level={selectedAgent.level}
                      />

                      {/* Actions */}
                      <div className="flex gap-3">
                        <GameButton variant="primary" size="md" className="flex-1">
                          启动
                        </GameButton>
                        <GameButton variant="secondary" size="md" className="flex-1">
                          暂停
                        </GameButton>
                        <GameButton variant="danger" size="md" className="flex-1">
                          停止
                        </GameButton>
                      </div>
                    </div>
                  </GamePanel>

                  {/* Quick Stats */}
                  <GamePanel title="实时监控" icon={<Activity size={20} />}>
                    <div className="space-y-4">
                      {mockAgents.map((agent) => (
                        <div key={agent.id} className="flex items-center gap-3">
                          <GameStatus status={agent.status} showDot={false} size="md" />
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium text-[var(--game-text-primary)]">
                                {agent.name}
                              </span>
                              <span className="text-xs text-[var(--game-text-muted)]">
                                CPU {agent.cpu}%
                              </span>
                            </div>
                            <GameProgress
                              value={agent.cpu}
                              max={100}
                              size="sm"
                              color={agent.cpu > 80 ? 'danger' : agent.cpu > 60 ? 'warning' : 'primary'}
                              showLabel={false}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </GamePanel>

                  {/* Team Overview */}
                  <GamePanel title="团队概览" icon={<Shield size={20} />}>
                    <div className="flex items-center justify-around py-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <GameIconGroup
                            icons={[
                              { type: 'bot', variant: 'success' },
                              { type: 'bot', variant: 'warning' },
                              { type: 'bot', variant: 'default' },
                            ]}
                            size="md"
                          />
                        </div>
                        <div className="text-2xl font-bold text-[var(--game-text-primary)]">
                          {mockAgents.length}
                        </div>
                        <div className="text-xs text-[var(--game-text-muted)]">在线代理</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <GameIconBadge icon="target" count={44} variant="success" />
                        </div>
                        <div className="text-2xl font-bold text-[var(--game-text-primary)]">
                          44
                        </div>
                        <div className="text-xs text-[var(--game-text-muted)]">完成任务</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <GameIconBadge icon="zap" count={128} variant="primary" />
                        </div>
                        <div className="text-2xl font-bold text-[var(--game-text-primary)]">
                          128h
                        </div>
                        <div className="text-xs text-[var(--game-text-muted)]">运行时长</div>
                      </div>
                    </div>
                  </GamePanel>

                  {/* Recent Activity */}
                  <GamePanel title="最近活动" icon={<Zap size={20} />}>
                    <div className="space-y-3">
                      {[
                        { time: '2分钟前', event: '任务完成：数据分析', agent: '数据分析师', xp: '+50' },
                        { time: '15分钟前', event: '等级提升：Lv.5 → Lv.6', agent: '代码助手', xp: '' },
                        { time: '1小时前', event: '成就解锁：高效工作者', agent: '', xp: '+500' },
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-3 p-2 rounded hover:bg-[var(--game-bg-tertiary)] transition-colors">
                          <div className="w-2 h-2 rounded-full bg-[var(--game-accent-primary)] mt-2" />
                          <div className="flex-1">
                            <div className="text-sm text-[var(--game-text-primary)]">{item.event}</div>
                            {item.agent && (
                              <div className="text-xs text-[var(--game-text-muted)]">{item.agent}</div>
                            )}
                          </div>
                          <div className="text-xs text-[var(--game-text-muted)]">{item.time}</div>
                          {item.xp && (
                            <div className="text-xs font-bold text-[var(--game-accent-warning)]">{item.xp}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </GamePanel>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Settings & Achievements */}
          {showSettings && (
            <div className="w-96 border-l border-[var(--game-border)] overflow-y-auto game-scrollbar">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-[var(--game-text-primary)]">设置</h2>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="p-1 hover:bg-[var(--game-bg-tertiary)] rounded transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
                <ThemeSettings />
              </div>
            </div>
          )}

          {showAchievements && (
            <div className="w-96 border-l border-[var(--game-border)] overflow-y-auto game-scrollbar">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-[var(--game-text-primary)]">成就</h2>
                  <button
                    onClick={() => setShowAchievements(false)}
                    className="p-1 hover:bg-[var(--game-bg-tertiary)] rounded transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
                <AchievementGrid achievements={mockAchievements} />
              </div>
            </div>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
};

const GameLevelBadge: React.FC<{ level: number }> = ({ level }) => {
  return (
    <div className="game-level-badge">
      Lv.{level}
    </div>
  );
};
