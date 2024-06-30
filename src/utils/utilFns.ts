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
  const currentDate = new Date();
  const differenceInMs = currentDate.getTime() - givenDate.getTime(); // 시간 차이 (밀리초 단위)
  const differenceInHours = differenceInMs / (1000 * 60 * 60); // 밀리초를 시간으로 변환
  return differenceInHours;
};
