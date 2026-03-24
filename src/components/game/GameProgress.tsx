import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface GameProgressProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'success' | 'warning' | 'danger';
  showLabel?: boolean;
  label?: string;
  className?: string;
}

export const GameProgress: React.FC<GameProgressProps> = ({
  value,
  max = 100,
  size = 'md',
  color = 'primary',
  showLabel = false,
  label,
  className = '',
}) => {
  const { config } = useTheme();
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  const gradientMap = {
    primary: 'linear-gradient(90deg, var(--game-accent-primary), var(--game-accent-secondary))',
    success: 'linear-gradient(90deg, var(--game-accent-success), #16a34a)',
    warning: 'linear-gradient(90deg, var(--game-accent-warning), #f97316)',
    danger: 'linear-gradient(90deg, var(--game-accent-danger), #dc2626)',
  };

  return (
    <div className={`w-full ${className}`}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-sm font-medium text-[var(--game-text-secondary)]">
              {label}
            </span>
          )}
          {showLabel && (
            <span className="text-sm font-bold text-[var(--game-accent-primary)]">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div className={`game-progress ${sizeClasses[size]}`}>
        <div
          className="game-progress-bar"
          style={{
            width: `${percentage}%`,
            background: gradientMap[color],
            animation: config.animationsEnabled ? undefined : 'none',
          }}
        />
      </div>
    </div>
  );
};

interface GameXPBarProps {
  current: number;
  max: number;
  level: number;
  showLevel?: boolean;
  className?: string;
}

export const GameXPBar: React.FC<GameXPBarProps> = ({
  current,
  max,
  level,
  showLevel = true,
  className = '',
}) => {
  const percentage = Math.min(100, Math.max(0, (current / max) * 100));

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {showLevel && (
        <div className="game-level-badge whitespace-nowrap">
          Lv.{level}
        </div>
      )}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-[var(--game-text-muted)]">XP</span>
          <span className="text-xs font-medium text-[var(--game-text-secondary)]">
            {current} / {max}
          </span>
        </div>
        <div className="game-xp-bar">
          <div
            className="game-xp-fill"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};
