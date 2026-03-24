import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface GameCardProps {
  children: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
  className?: string;
  glow?: boolean;
  float?: boolean;
}

export const GameCard: React.FC<GameCardProps> = ({
  children,
  onClick,
  selected = false,
  className = '',
  glow = false,
  float = false,
}) => {
  const { config, getSizeClass } = useTheme();
  const paddingClass = getSizeClass('card');

  return (
    <div
      onClick={onClick}
      className={`
        game-card
        ${paddingClass}
        ${selected ? 'selected' : ''}
        ${glow ? 'ring-2 ring-[var(--game-accent-primary)]' : ''}
        ${float && config.animationsEnabled ? 'game-float-animation' : ''}
        ${className}
      `}
      style={{
        cursor: onClick ? 'pointer' : 'default',
        animation: config.animationsEnabled ? undefined : 'none',
      }}
    >
      {children}
    </div>
  );
};
