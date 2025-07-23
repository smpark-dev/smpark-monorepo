import { EmotionIcon } from '../EmotionIcon';
import { type EmotionType } from '../../lib';

interface EmotionStatusProps {
  currentEmotion: EmotionType;
}

export const EmotionStatus = ({ currentEmotion }: EmotionStatusProps) => {
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-black/40 border border-white/10 rounded-xl backdrop-blur-lg transition-all hover:bg-black/50 hover:-translate-y-0.5">
      <EmotionIcon emotion={currentEmotion} size="md" showText />
    </div>
  );
};