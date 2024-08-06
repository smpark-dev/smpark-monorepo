export const copyTextToClipboard = async (text: string): Promise<void> => {
  if (!navigator.clipboard) {
    console.error('클립보드 API 사용 불가');
    alert('클립보드 API를 사용할 수 없습니다.');
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    alert('복사 되었습니다.');
  } catch (err) {
    console.error('텍스트 복사 실패', err);
    alert('텍스트 복사에 실패했습니다.');
  }
};
