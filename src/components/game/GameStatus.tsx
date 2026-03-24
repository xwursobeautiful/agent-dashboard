import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export type StatusType = 'active' | 'busy' | 'idle' | 'offline' | 'error';

interface GameStatusProps {
  status: StatusType;
  label?: string;
  showDot?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const GameStatus: React.FC<GameStatusProps> = ({
  status,
  label,
  showDot = true,
  size = 'md',
  className = '',
}) => {
  const { config } = useTheme();

  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
  };

  const statusConfig = {
    active: {
      color: 'var(--game-accent-success)',
      glow: '0 0 10px var(--game-accent-success)',
      label: label || '运行中',
    },
    busy: {
      color: 'var(--game-accent-warning)',
      glow: '0 0 10px var(--game-accent-warning)',
      label: label || '忙碌',
    },
    idle: {
      color: 'var(--game-text-muted)',
      glow: 'none',
      label: label || '空闲',
    },
    offline: {
      color: '#475569',
      glow: 'none',
      label: label || '离线',
    },
    error: {
      color: 'var(--game-accent-danger)',
      glow: '0 0 10px var(--game-accent-danger)',
      label: label || '错误',
    },
  };

  const config_item = statusConfig[status];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showDot && (
        <div
          className={`rounded-full ${sizeClasses[size]}`}
          style={{
            backgroundColor: config_item.color,
            boxShadow: config.animationsEnabled ? config_item.glow : 'none',
          }}
        >
          {(status === 'active' || status === 'busy') && config.animationsEnabled && (
            <span
              className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
              style={{ backgroundColor: config_item.color }}
            />
          )}
        </div>
      )}
      <span
        className="text-sm font-medium"
        style={{ color: config_item.color }}
      >
        {config_item.label}
      </span>
    </div>
  );
};

interface GameHealthBarProps {
  current: number;
  max: number;
  shield?: number;
  className?: string;
}

export const GameHealthBar: React.FC<GameHealthBarProps> = ({
  current,
  max,
  shield = 0,
  className = '',
}) => {
  const healthPercentage = Math.min(100, Math.max(0, (current / max) * 100));
  const shieldPercentage = Math.min(100, Math.max(0, (shield / max) * 100));

  const getHealthColor = () => {
    if (healthPercentage > 60) return 'var(--game-accent-success)';
    if (healthPercentage > 30) return 'var(--game-accent-warning)';
    return 'var(--game-accent-danger)';
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-[var(--game-text-muted)]">HP</span>
        <span className="text-xs font-medium text-[var(--game-text-secondary)]">
          {current}/{max}
          {shield > 0 && <span className="text-[var(--game-accent-info)] ml-1">+{shield}</span>}
        </span>
      </div>
      <div className="h-3 bg-[var(--game-bg-tertiary)] rounded-full overflow-hidden relative">
        {/* Health bar */}
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${healthPercentage}%`,
            backgroundColor: getHealthColor(),
            boxShadow: `0 0 10px ${getHealthColor()}`,
          }}
        />
        {/* Shield bar */}
        {shield > 0 && (
          <div
            className="absolute top-0 h-full rounded-full transition-all duration-500 ease-out"
            style={{
              left: `${healthPercentage}%`,
              width: `${shieldPercentage}%`,
              backgroundColor: 'var(--game-accent-info)',
              opacity: 0.8,
            }}
          />
        )}
      </div>
    </div>
  );
};

interface GameResourceBarProps {
  icon: React.ReactNode;
  value: number;
  max: number;
  color: string;
  label?: string;
  className?: string;
}

export const GameResourceBar: React.FC<GameResourceBarProps> = ({
  icon,
  value,
  max,
  color,
  label,
  className = '',
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div
        className="w-6 h-6 rounded flex items-center justify-center"
        style={{ backgroundColor: color, opacity: 0.2 }}
      >
        <div style={{ color }}>{icon}</div>
      </div>
      <div className="flex-1">
        {label && (
          <div className="flex justify-between items-center mb-0.5">
            <span className="text-xs text-[var(--game-text-muted)]">{label}</span>
            <span className="text-xs font-medium" style={{ color }}>
              {value}/{max}
            </span>
          </div>
        )}
        <div className="h-1.5 bg-[var(--game-bg-tertiary)] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${percentage}%`,
              backgroundColor: color,
            }}
          />
        </div>
      </div>
    </div>
  );
};
