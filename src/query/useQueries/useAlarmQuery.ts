import { useQuery } from '@tanstack/react-query';
import { ALARM_QUIZ_COMMENTS_QUERY_KEY } from '../alarm/alarmQueryKey';
import { fetchQuizCommentsAlarm } from '../alarm/alarmQueryFn';
import { QuizCommentsAlarm } from '@/type/alarmType';

export const useFetchQuizCommentsAlarms = (currentUserId: string | undefined) => {
  const { data: quizCommentsAlarms, isLoading: quizCommentsLoading } = useQuery<QuizCommentsAlarm[]>({
    queryKey: [ALARM_QUIZ_COMMENTS_QUERY_KEY],
    queryFn: () => fetchQuizCommentsAlarm(currentUserId),
    enabled: !!currentUserId
  });

  return { quizCommentsAlarms, quizCommentsLoading };
};
