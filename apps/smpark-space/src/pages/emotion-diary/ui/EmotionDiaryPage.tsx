import { Button } from '@/shared/ui';
import { EmotionStatus, DiaryEditor, useDiaryEditor } from '@/features/emotion-diary';

export const EmotionDiaryPage = () => {
  const { currentEmotion } = useDiaryEditor();

  const handleListClick = () => {
    // TODO: 일기 리스트 모달 열기
    console.log('Opening diary list modal');
  };

  return (
    <div className="relative w-screen h-screen flex flex-col text-white">
      {/* 상단 헤더 */}
      <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-6 bg-gradient-to-b from-black/40 to-transparent backdrop-blur-lg">
        <EmotionStatus currentEmotion={currentEmotion} />
        <Button
          onClick={handleListClick}
          className="bg-black/40 border border-white/10 hover:bg-black/50 px-4 py-2 rounded-lg text-white transition-all hover:-translate-y-0.5"
        >
          리스트
        </Button>
      </div>

      {/* 중앙 Canvas 영역 - StarryNightCanvas가 배경으로 */}
      <div className="flex-1">
        {/* Canvas는 layout.tsx에서 전역으로 렌더링됨 */}
      </div>

      {/* 하단 에디터 영역 */}
      <div className="absolute bottom-0 left-0 right-0 h-[35vh] z-5 p-8 bg-gradient-to-t from-black/40 via-black/20 to-transparent backdrop-blur-xl">
        <DiaryEditor />
      </div>
    </div>
  );
};