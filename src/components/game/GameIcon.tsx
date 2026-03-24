import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import {
  Bot,
  Cpu,
  Zap,
  Shield,
  Target,
  Globe,
  Database,
  Code,
  Sparkles,
  Brain,
  MessageSquare,
  Workflow,
  Trophy,
  Activity,
  Settings,
  LucideIcon,
} from 'lucide-react';

export type GameIconType = 
  | 'bot' 
  | 'cpu' 
  | 'zap' 
  | 'shield' 
  | 'target' 
  | 'globe' 
  | 'database' 
  | 'code' 
  | 'sparkles' 
  | 'brain' 
  | 'message' 
  | 'workflow'
  | 'trophy'
  | 'activity'
  | 'settings';

interface GameIconProps {
  type: GameIconType;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  glow?: boolean;
  className?: string;
  onClick?: () => void;
}

const iconMap: Record<GameIconType, LucideIcon> = {
  bot: Bot,
  cpu: Cpu,
  zap: Zap,
  shield: Shield,
  target: Target,
  globe: Globe,
  database: Database,
  code: Code,
  sparkles: Sparkles,
  brain: Brain,
  message: MessageSquare,
  workflow: Workflow,
  trophy: Trophy,
  activity: Activity,
  settings: Settings,
};

const sizeMap = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
};

const variantColors = {
  default: 'var(--game-text-secondary)',
  primary: 'var(--game-accent-primary)',
  success: 'var(--game-accent-success)',
  warning: 'var(--game-accent-warning)',
  danger: 'var(--game-accent-danger)',
  info: 'var(--game-accent-info)',
};

export const GameIcon: React.FC<GameIconProps> = ({
  type,
  size = 'md',
  variant = 'default',
  glow = false,
  className = '',
  onClick,
}) => {
  const { getSizeClass } = useTheme();
  const Icon = iconMap[type];
  const iconSize = sizeMap[size];
  const color = variantColors[variant];
  const iconBtnClass = getSizeClass('icon');

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`game-icon-btn ${iconBtnClass} ${className}`}
        style={{
          color,
          boxShadow: glow ? `0 0 15px ${color}` : undefined,
        }}
      >
        <Icon size={iconSize} />
      </button>
    );
  }

  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
      style={{
        color,
        filter: glow ? `drop-shadow(0 0 8px ${color})` : undefined,
      }}
    >
      <Icon size={iconSize} />
    </div>
  );
};

interface GameIconBadgeProps {
  icon: GameIconType;
  count?: number;
  maxCount?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  className?: string;
}

export const GameIconBadge: React.FC<GameIconBadgeProps> = ({
  icon,
  count,
  maxCount = 99,
  size = 'md',
  variant = 'primary',
  className = '',
}) => {
  const Icon = iconMap[icon];
  const color = variantColors[variant];
  const displayCount = count !== undefined && count > maxCount ? `${maxCount}+` : count;

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  return (
    <div className={`relative inline-flex ${className}`}>
      <div
        className={`${sizeClasses[size]} rounded-xl flex items-center justify-center`}
        style={{
          backgroundColor: `${color}20`,
          border: `2px solid ${color}40`,
          color,
        }}
      >
        <Icon size={iconSizes[size]} />
      </div>
      {count !== undefined && (
        <div
          className="absolute -top-1 -right-1 min-w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold px-1"
          style={{
            backgroundColor: color,
            color: 'white',
            boxShadow: `0 2px 8px ${color}80`,
          }}
        >
          {displayCount}
        </div>
      )}
    </div>
  );
};

interface GameIconGroupProps {
  icons: { type: GameIconType; variant?: GameIconProps['variant'] }[];
  size?: 'sm' | 'md' | 'lg';
  overlap?: boolean;
  className?: string;
}

export const GameIconGroup: React.FC<GameIconGroupProps> = ({
  icons,
  size = 'md',
  overlap = true,
  className = '',
}) => {
  const { getSizeClass } = useTheme();
  const gapClass = getSizeClass('gap');

  return (
    <div className={`flex items-center ${overlap ? '-space-x-2' : gapClass} ${className}`}>
      {icons.map((icon, index) => (
        <div
          key={index}
          className="relative z-10 hover:z-20 transition-transform hover:scale-110"
          style={{ zIndex: icons.length - index }}
        >
          <GameIcon
            type={icon.type}
            size={size}
            variant={icon.variant || 'default'}
          />
        </div>
      ))}
    </div>
  );
};
