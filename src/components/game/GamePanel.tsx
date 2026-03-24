import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface GamePanelProps {
  children: React.ReactNode;
  title?: string;
  icon?: React.ReactNode;
  className?: string;
  showCorners?: boolean;
  glow?: boolean;
}

export const GamePanel: React.FC<GamePanelProps> = ({
  children,
  title,
  icon,
  className = '',
  showCorners = true,
  glow = false,
}) => {
  const { config, getSizeClass } = useTheme();
  const paddingClass = getSizeClass('panel');

  return (
    <div
      className={`game-panel ${paddingClass} ${className} ${glow ? 'ring-2 ring-[var(--game-accent-primary)] ring-opacity-50' : ''}`}
      style={{
        animation: config.animationsEnabled ? undefined : 'none',
      }}
    >
      {showCorners && (
        <>
          <div className="game-panel-corner top-left" />
          <div className="game-panel-corner top-right" />
          <div className="game-panel-corner bottom-left" />
          <div className="game-panel-corner bottom-right" />
        </>
      )}
      
      {(title || icon) && (
        <div className="flex items-center gap-3 mb-4 relative z-10">
          {icon && (
            <div className="game-icon-btn !w-10 !h-10 !rounded-lg">
              {icon}
            </div>
          )}
          {title && (
            <h3 className="text-lg font-bold text-[var(--game-text-primary)] game-glow-text">
              {title}
            </h3>
          )}
        </div>
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
