import { Button } from '@/shared/ui';
import { useDiaryEditor } from '../../model';
import { DIARY_CONFIG } from '../../lib';

interface DiaryEditorProps {
  onTextChange?: (text: string) => void;
  initialText?: string;
}

export const DiaryEditor = ({ onTextChange, initialText }: DiaryEditorProps) => {
  const {
    text,
    isTyping,
    characterCount,
    wordCount,
    handleTextChange,
    saveDiary
  } = useDiaryEditor(initialText);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length <= DIARY_CONFIG.MAX_CHARACTERS) {
      handleTextChange(newText);
      onTextChange?.(newText);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <div className="text-white text-lg font-semibold text-shadow">
          오늘의 감정을 기록해보세요
        </div>
        <div className="flex items-center gap-2 text-xs text-white/60">
          <span>{wordCount}단어</span>
          <span>•</span>
          <span>{characterCount}/{DIARY_CONFIG.MAX_CHARACTERS}자</span>
          {isTyping && (
            <span className="text-blue-400 animate-pulse">입력 중...</span>
          )}
        </div>
      </div>

      {/* 텍스트 에어리어 */}
      <textarea
        value={text}
        onChange={handleChange}
        placeholder={`당신의 하루는 어땠나요? 자유롭게 마음을 담아 적어보세요...

감정이 담긴 글을 쓸수록 더 아름다운 별들이 피어날 거예요 ✨`}
        className="flex-1 w-full bg-black/40 border border-white/10 rounded-xl p-6 text-white placeholder-gray-400 resize-none outline-none backdrop-blur-lg transition-all focus:border-blue-500 focus:bg-black/50 focus:shadow-[0_0_0_2px_rgba(59,130,246,0.2)] hover:border-white/20 leading-relaxed"
        spellCheck={false}
        autoComplete="off"
      />

      {/* 푸터 */}
      <div className="flex justify-end">
        <Button
          onClick={saveDiary}
          disabled={!text.trim()}
          className="bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 px-6 py-2 rounded-lg text-white font-medium transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          저장하기
        </Button>
      </div>
    </div>
  );
};