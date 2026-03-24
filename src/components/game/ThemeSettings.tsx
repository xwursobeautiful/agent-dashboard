import React from 'react';
import { Palette, Layout, Zap, Volume2, Check } from 'lucide-react';
import { useTheme, ThemeType, IconStyle, InterfaceSize } from '../../context/ThemeContext';
import { GamePanel } from './GamePanel';
import { GameButton } from './GameButton';

const themes: { id: ThemeType; name: string; description: string; colors: string[] }[] = [
  {
    id: 'default',
    name: '默认主题',
    description: '现代科幻风格，紫蓝色调',
    colors: ['#6366f1', '#8b5cf6', '#22c55e'],
  },
  {
    id: 'cyberpunk',
    name: '赛博朋克',
    description: '霓虹灯光，青粉配色',
    colors: ['#00f5ff', '#ff00ff', '#00ff88'],
  },
  {
    id: 'fantasy',
    name: '奇幻风格',
    description: '暖色调，魔法氛围',
    colors: ['#ff6b35', '#f7931e', '#7cb342'],
  },
  {
    id: 'retro',
    name: '复古像素',
    description: '经典游戏怀旧风格',
    colors: ['#e0e1dd', '#778da9', '#52b788'],
  },
];

const iconStyles: { id: IconStyle; name: string; description: string }[] = [
  { id: 'modern', name: '现代', description: '简洁现代图标' },
  { id: 'pixel', name: '像素', description: '复古像素风格' },
  { id: 'outline', name: '线条', description: '线条轮廓风格' },
];

const interfaceSizes: { id: InterfaceSize; name: string; description: string }[] = [
  { id: 'compact', name: '紧凑', description: '更小的间距和元素' },
  { id: 'normal', name: '标准', description: '平衡的布局' },
  { id: 'large', name: '大', description: '更大的元素和间距' },
];

export const ThemeSettings: React.FC = () => {
  const { config, setTheme, setIconStyle, setInterfaceSize, toggleAnimations, toggleSound } = useTheme();

  return (
    <GamePanel title="主题设置" icon={<Palette size={20} />} className="w-full max-w-md">
      <div className="space-y-6">
        {/* Theme Selection */}
        <div>
          <h4 className="text-sm font-semibold text-[var(--game-text-secondary)] mb-3 flex items-center gap-2">
            <Palette size={16} />
            选择主题
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setTheme(theme.id)}
                className={`
                  relative p-3 rounded-xl border-2 transition-all duration-200 text-left
                  ${config.theme === theme.id
                    ? 'border-[var(--game-accent-primary)] bg-[var(--game-accent-primary)]/10'
                    : 'border-[var(--game-border)] hover:border-[var(--game-accent-primary)]/50'
                  }
                `}
              >
                <div className="flex gap-1 mb-2">
                  {theme.colors.map((color, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <div className="font-medium text-[var(--game-text-primary)] text-sm">
                  {theme.name}
                </div>
                <div className="text-xs text-[var(--game-text-muted)] mt-0.5">
                  {theme.description}
                </div>
                {config.theme === theme.id && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[var(--game-accent-primary)] flex items-center justify-center">
                    <Check size={12} className="text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Icon Style */}
        <div>
          <h4 className="text-sm font-semibold text-[var(--game-text-secondary)] mb-3 flex items-center gap-2">
            <Layout size={16} />
            图标风格
          </h4>
          <div className="flex gap-2">
            {iconStyles.map((style) => (
              <GameButton
                key={style.id}
                variant={config.iconStyle === style.id ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setIconStyle(style.id)}
                className="flex-1"
              >
                {style.name}
              </GameButton>
            ))}
          </div>
        </div>

        {/* Interface Size */}
        <div>
          <h4 className="text-sm font-semibold text-[var(--game-text-secondary)] mb-3 flex items-center gap-2">
            <Layout size={16} />
            界面大小
          </h4>
          <div className="flex gap-2">
            {interfaceSizes.map((size) => (
              <GameButton
                key={size.id}
                variant={config.interfaceSize === size.id ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setInterfaceSize(size.id)}
                className="flex-1"
              >
                {size.name}
              </GameButton>
            ))}
          </div>
        </div>

        {/* Toggles */}
        <div>
          <h4 className="text-sm font-semibold text-[var(--game-text-secondary)] mb-3 flex items-center gap-2">
            <Zap size={16} />
            其他选项
          </h4>
          <div className="space-y-2">
            <button
              onClick={toggleAnimations}
              className="w-full flex items-center justify-between p-3 rounded-xl border border-[var(--game-border)] hover:border-[var(--game-accent-primary)]/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--game-bg-tertiary)] flex items-center justify-center">
                  <Zap size={18} className="text-[var(--game-accent-warning)]" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-[var(--game-text-primary)]">动画效果</div>
                  <div className="text-xs text-[var(--game-text-muted)]">启用界面动画</div>
                </div>
              </div>
              <div
                className={`
                  w-12 h-6 rounded-full transition-colors relative
                  ${config.animationsEnabled ? 'bg-[var(--game-accent-success)]' : 'bg-[var(--game-bg-tertiary)]'}
                `}
              >
                <div
                  className={`
                    absolute top-1 w-4 h-4 rounded-full bg-white transition-transform
                    ${config.animationsEnabled ? 'left-7' : 'left-1'}
                  `}
                />
              </div>
            </button>

            <button
              onClick={toggleSound}
              className="w-full flex items-center justify-between p-3 rounded-xl border border-[var(--game-border)] hover:border-[var(--game-accent-primary)]/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--game-bg-tertiary)] flex items-center justify-center">
                  <Volume2 size={18} className="text-[var(--game-accent-info)]" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-[var(--game-text-primary)]">音效</div>
                  <div className="text-xs text-[var(--game-text-muted)]">启用交互音效</div>
                </div>
              </div>
              <div
                className={`
                  w-12 h-6 rounded-full transition-colors relative
                  ${config.soundEnabled ? 'bg-[var(--game-accent-success)]' : 'bg-[var(--game-bg-tertiary)]'}
                `}
              >
                <div
                  className={`
                    absolute top-1 w-4 h-4 rounded-full bg-white transition-transform
                    ${config.soundEnabled ? 'left-7' : 'left-1'}
                  `}
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </GamePanel>
  );
};
