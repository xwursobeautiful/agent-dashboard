import React, { useState, useRef, useCallback } from 'react';

interface GameTooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  className?: string;
}

export const GameTooltip: React.FC<GameTooltipProps> = ({
  children,
  content,
  position = 'top',
  delay = 300,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showTooltip = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  }, [delay]);

  const hideTooltip = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  }, []);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[var(--game-bg-secondary)]',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-[var(--game-bg-secondary)]',
    left: 'left-full top-1/2 -translate-y-1/2 border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent border-l-[var(--game-bg-secondary)]',
    right: 'right-full top-1/2 -translate-y-1/2 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-[var(--game-bg-secondary)]',
  };

  return (
    <div
      className={`relative inline-flex ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      <div
        className={`
          absolute z-50 whitespace-nowrap
          ${positionClasses[position]}
          ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}
          transition-all duration-200
        `}
      >
        <div className="game-tooltip">
          {content}
        </div>
        <div className={`absolute w-0 h-0 ${arrowClasses[position]}`} />
      </div>
    </div>
  );
};

interface GameStatTooltipProps {
  children: React.ReactNode;
  title: string;
  value: string | number;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

export const GameStatTooltip: React.FC<GameStatTooltipProps> = ({
  children,
  title,
  value,
  description,
  trend,
  trendValue,
  className = '',
}) => {
  const trendColors = {
    up: 'var(--game-accent-success)',
    down: 'var(--game-accent-danger)',
    neutral: 'var(--game-text-muted)',
  };

  const trendIcons = {
    up: '↑',
    down: '↓',
    neutral: '→',
  };

  const content = (
    <div className="min-w-[150px]">
      <div className="text-xs text-[var(--game-text-muted)] uppercase tracking-wider mb-1">
        {title}
      </div>
      <div className="text-lg font-bold text-[var(--game-text-primary)] mb-1">
        {value}
      </div>
      {description && (
        <div className="text-xs text-[var(--game-text-secondary)] mb-2">
          {description}
        </div>
      )}
      {trend && trendValue && (
        <div
          className="flex items-center gap-1 text-xs font-medium"
          style={{ color: trendColors[trend] }}
        >
          <span>{trendIcons[trend]}</span>
          <span>{trendValue}</span>
        </div>
      )}
    </div>
  );

  return (
    <GameTooltip content={content} className={className}>
      {children}
    </GameTooltip>
  );
};
