import React from 'react';
import { Activity, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

interface HeaderProps {
  stats: {
    total: number;
    running: number;
    error: number;
    completed: number;
  };
}

export const Header: React.FC<HeaderProps> = ({ stats }) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Activity className="w-6 h-6 text-blue-500" />
            Agent Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <StatCard
            icon={<Clock className="w-5 h-5" />}
            label="总数"
            value={stats.total}
            color="text-slate-400"
          />
          <StatCard
            icon={<Activity className="w-5 h-5" />}
            label="运行中"
            value={stats.running}
            color="text-green-400"
          />
          <StatCard
            icon={<AlertCircle className="w-5 h-5" />}
            label="异常"
            value={stats.error}
            color="text-red-400"
          />
          <StatCard
            icon={<CheckCircle2 className="w-5 h-5" />}
            label="今日完成"
            value={stats.completed}
            color="text-blue-400"
          />
        </div>
      </div>
    </header>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, color }) => {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg">
      <div className={color}>{icon}</div>
      <div>
        <div className="text-xs text-slate-400">{label}</div>
        <div className={`text-lg font-bold ${color}`}>{value}</div>
      </div>
    </div>
  );
};
