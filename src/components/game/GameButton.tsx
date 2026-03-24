import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface GameButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
}

export const GameButton: React.FC<GameButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon,
  disabled = false,
  className = '',
  fullWidth = false,
}) => {
  const { config } = useTheme();

  const sizeClasses = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  const variantStyles = {
    primary: {
      background: 'linear-gradient(145deg, var(--game-accent-primary), var(--game-accent-secondary))',
      boxShadow: `0 4px 15px var(--game-glow)`,
    },
    secondary: {
      background: 'transparent',
      border: '2px solid var(--game-accent-primary)',
      color: 'var(--game-accent-primary)',
    },
    danger: {
      background: 'linear-gradient(145deg, var(--game-accent-danger), #dc2626)',
      boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)',
    },
    success: {
      background: 'linear-gradient(145deg, var(--game-accent-success), #16a34a)',
      boxShadow: '0 4px 15px rgba(34, 197, 94, 0.4)',
    },
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        game-btn
        ${sizeClasses[size]}
        ${variant === 'secondary' ? 'game-btn-secondary' : ''}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      style={{
        ...variantStyles[variant],
        animation: config.animationsEnabled ? undefined : 'none',
      }}
    >
      <span className="flex items-center justify-center gap-2">
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
      </span>
    </button>
  );
};
