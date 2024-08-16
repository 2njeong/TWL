import { Tables } from '@/type/database';
import { SevenDaysTodolist } from '@/type/memberType';

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
  const differenceInMinutes = differenceInMs / (1000 * 60); // 밀리초를 분으로 변환
  const differenceInHours = Math.floor(differenceInMinutes / 60); // 분을 시간으로 변환하고 소수점 버림
  const remainingMinutes = Math.floor(differenceInMinutes > 0 ? differenceInMinutes % 60 : 0); // 남은 분 계산

  return {
    hours: differenceInHours,
    minutes: remainingMinutes
  };
};

export const getToday = () => {
  const date = new Date();

  // 한국 시간 기준 날짜를 'YYYY-MM-DD' 형식으로 변환
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

export const getTodos = (day: string, sevenDaysTodolist: SevenDaysTodolist[] | undefined): Tables<'todolist'>[] => {
  const todolist = sevenDaysTodolist?.find((todolist) => todolist.day === day);
  return todolist?.todos ?? [];
};

export const openNewWindow = (creator_id: string | undefined) => {
  const features =
    'width=1400,height=700,resizable=yes,scrollbars=no,status=yes,toolbar=no,menubar=no,location=yes, noopener, noreferrer';
  window.open(`/member/${creator_id}`, '_blank', features);
};
