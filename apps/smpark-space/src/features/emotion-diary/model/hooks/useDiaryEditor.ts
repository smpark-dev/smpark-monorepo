import { useState, useCallback } from 'react';
import { DIARY_CONFIG, type EmotionType } from '../../lib';

export const useDiaryEditor = (initialText = '') => {
  const [text, setText] = useState(initialText);
  const [isTyping, setIsTyping] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<EmotionType>('neutral'); // 타입 수정

  const handleTextChange = useCallback((value: string) => {
    setText(value);
    setIsTyping(true);
    
    // 타이핑 상태 리셋 (debounce 효과)
    setTimeout(() => {
      setIsTyping(false);
      // TODO: 감정 분석 API 호출
      // analyzeEmotion(value);
    }, DIARY_CONFIG.TYPING_DEBOUNCE);
  }, []);

  const characterCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  const saveDiary = useCallback(() => {
    // TODO: 일기 저장 로직
    console.log('Saving diary:', { text, emotion: currentEmotion });
  }, [text, currentEmotion]);

  return {
    text,
    isTyping,
    currentEmotion,
    characterCount,
    wordCount,
    handleTextChange,
    saveDiary,
    setCurrentEmotion,
  };
};