import { EMOTIONS, type EmotionType } from '../../lib';

interface EmotionIconProps {
  emotion: EmotionType;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const EmotionIcon = ({ 
  emotion, 
  size = 'md', 
  showText = false,
  className = ''
}: EmotionIconProps) => {
  const emotionData = EMOTIONS[emotion];
  
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl', 
    lg: 'text-4xl'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span 
        className={`${sizeClasses[size]} transition-transform hover:scale-110`}
        style={{ color: emotionData.color }}
      >
        {emotionData.icon}
      </span>
      {showText && (
        <span className={`text-white ${textSizeClasses[size]} font-medium`}>
          {emotionData.text}
        </span>
      )}
    </div>
  );
};