import React from 'react';
import { Trophy, Star, Zap, Shield, Target, Crown } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: 'trophy' | 'star' | 'zap' | 'shield' | 'target' | 'crown';
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  reward?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface GameAchievementProps {
  achievement: Achievement;
  onClick?: () => void;
  className?: string;
}

const iconMap = {
  trophy: Trophy,
  star: Star,
  zap: Zap,
  shield: Shield,
  target: Target,
  crown: Crown,
};

const rarityColors = {
  common: { bg: '#64748b', glow: 'rgba(100, 116, 139, 0.4)' },
  rare: { bg: '#3b82f6', glow: 'rgba(59, 130, 246, 0.4)' },
  epic: { bg: '#a855f7', glow: 'rgba(168, 85, 247, 0.4)' },
  legendary: { bg: '#f59e0b', glow: 'rgba(245, 158, 11, 0.5)' },
};

export const GameAchievement: React.FC<GameAchievementProps> = ({
  achievement,
  onClick,
  className = '',
}) => {
  const { config } = useTheme();
  const Icon = iconMap[achievement.icon];
  const rarity = rarityColors[achievement.rarity];
  const progressPercentage = (achievement.progress / achievement.maxProgress) * 100;

  return (
    <div
      onClick={onClick}
      className={`
        game-achievement
        ${achievement.unlocked ? 'unlocked' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      style={{
        opacity: achievement.unlocked ? 1 : 0.6,
        animation: config.animationsEnabled ? undefined : 'none',
      }}
    >
      {/* Rarity border glow */}
      {achievement.unlocked && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow: `inset 0 0 20px ${rarity.glow}`,
          }}
        />
      )}

      <div className="flex items-start gap-4 relative z-10">
        {/* Icon */}
        <div
          className="game-achievement-icon flex-shrink-0"
          style={{
            background: achievement.unlocked
              ? `linear-gradient(145deg, ${rarity.bg}, ${rarity.bg}dd)`
              : 'linear-gradient(145deg, var(--game-bg-tertiary), var(--game-bg-secondary))',
            boxShadow: achievement.unlocked ? `0 4px 15px ${rarity.glow}` : 'none',
          }}
        >
          <Icon
            size={28}
            style={{
              color: achievement.unlocked ? 'white' : 'var(--game-text-muted)',
            }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-bold text-[var(--game-text-primary)] truncate">
              {achievement.title}
            </h4>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium capitalize"
              style={{
                backgroundColor: `${rarity.bg}33`,
                color: rarity.bg,
              }}
            >
              {achievement.rarity}
            </span>
          </div>
          
          <p className="text-sm text-[var(--game-text-secondary)] mb-3">
            {achievement.description}
          </p>

          {/* Progress bar */}
          <div className="relative">
            <div className="h-2 bg-[var(--game-bg-tertiary)] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${progressPercentage}%`,
                  backgroundColor: achievement.unlocked ? rarity.bg : 'var(--game-text-muted)',
                }}
              />
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-[var(--game-text-muted)]">
                {achievement.unlocked ? '已完成' : '进度'}
              </span>
              <span
                className="text-xs font-medium"
                style={{ color: achievement.unlocked ? rarity.bg : 'var(--game-text-muted)' }}
              >
                {achievement.progress}/{achievement.maxProgress}
              </span>
            </div>
          </div>

          {/* Reward */}
          {achievement.reward && achievement.unlocked && (
            <div className="mt-3 flex items-center gap-2 text-sm">
              <Star size={14} className="text-[var(--game-accent-warning)]" />
              <span className="text-[var(--game-accent-warning)]">{achievement.reward}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface AchievementGridProps {
  achievements: Achievement[];
  onAchievementClick?: (achievement: Achievement) => void;
  className?: string;
}

export const AchievementGrid: React.FC<AchievementGridProps> = ({
  achievements,
  onAchievementClick,
  className = '',
}) => {
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-[var(--game-text-primary)]">成就系统</h3>
        <div className="flex items-center gap-2">
          <Trophy size={18} className="text-[var(--game-accent-warning)]" />
          <span className="text-sm text-[var(--game-text-secondary)]">
            <span className="text-[var(--game-accent-warning)] font-bold">{unlockedCount}</span>
            <span className="mx-1">/</span>
            <span>{totalCount}</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {achievements.map((achievement) => (
          <GameAchievement
            key={achievement.id}
            achievement={achievement}
            onClick={() => onAchievementClick?.(achievement)}
          />
        ))}
      </div>
    </div>
  );
};
