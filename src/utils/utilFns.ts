export const getformattedDate = (date: string) =>
  new Date(date).toLocaleString('ko', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });

export const getHoursDifference = (dateStr: string) => {
  const givenDate = new Date(dateStr);
  console.log('한국시간으로  =>', givenDate);
  const currentDate = new Date();
  console.log('현재시간 =>', currentDate);

  const differenceInMs = currentDate.getTime() - givenDate.getTime(); // 시간 차이 (밀리초 단위)
  const differenceInMinutes = differenceInMs / (1000 * 60); // 밀리초를 분으로 변환
  const differenceInHours = Math.floor(differenceInMinutes / 60); // 분을 시간으로 변환하고 소수점 버림
  const remainingMinutes = Math.floor(differenceInMinutes % 60); // 남은 분 계산

  return {
    hours: differenceInHours,
    minutes: remainingMinutes
  };
};
