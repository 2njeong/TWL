import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ALARM_QUIZ_COMMENTS_QUERY_KEY } from '../alarm/alarmQueryKey';
import { fetchQuizCommentsAlarm, updateCommentsRead } from '../alarm/alarmQueryFn';
import { QuizCommentsAlarm } from '@/type/alarmType';

export const useFetchQuizCommentsAlarms = (currentUserId: string | undefined) => {
  const { data: quizCommentsAlarms, isLoading: quizCommentsLoading } = useQuery<QuizCommentsAlarm[]>({
    queryKey: [ALARM_QUIZ_COMMENTS_QUERY_KEY],
    queryFn: () => fetchQuizCommentsAlarm(currentUserId),
    enabled: !!currentUserId
  });

  return { quizCommentsAlarms, quizCommentsLoading };
};

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();
  const { mutate: markAsRead } = useMutation({
    mutationFn: ({ comment_id }: { comment_id: string }) => updateCommentsRead(comment_id),
    onSuccess: async () => await queryClient.invalidateQueries({ queryKey: [ALARM_QUIZ_COMMENTS_QUERY_KEY] })
  });
  return { mutate: markAsRead };
};
