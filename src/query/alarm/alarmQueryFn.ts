import { QuizCommentsAlarm } from '@/type/alarmType';

export const fetchQuizCommentsAlarm = async (currentUserId: string | undefined): Promise<QuizCommentsAlarm[]> => {
  const response = await fetch(`/auth/api?type=quizCommentsAlarm&currentUserId=${currentUserId}`);
  if (!response.ok) {
    throw new Error('quizCommentsAlarm response was not ok');
  }
  return response.json();
};
