import { useMutation, useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { ALARM_GUESTBOOK_QUERY_KEY, ALARM_QUIZ_COMMENTS_QUERY_KEY } from '../alarm/alarmQueryKey';
import {
  fetchGuestbookAlarm,
  fetchQuizCommentsAlarm,
  updateCommentsRead,
  updateGuestbookRead
} from '../alarm/alarmQueryFn';
import { GuestbookAlarm, QuizCommentsAlarm } from '@/type/alarmType';

export const useFetchQuizCommentsAlarms = (currentUserId: string | undefined) => {
  const { data: quizCommentsAlarms, isLoading: quizCommentsAlarmLoading } = useQuery<QuizCommentsAlarm[]>({
    queryKey: [ALARM_QUIZ_COMMENTS_QUERY_KEY],
    queryFn: () => fetchQuizCommentsAlarm(currentUserId),
    enabled: !!currentUserId
  });
  return { quizCommentsAlarms, quizCommentsAlarmLoading };
};

export const useFetchGuestbookAlarm = (currentUserId: string | undefined) => {
  const { data: guestbookAlarms, isLoading: guestbookAlarmLoading } = useQuery<GuestbookAlarm[]>({
    queryKey: [ALARM_GUESTBOOK_QUERY_KEY],
    queryFn: () => fetchGuestbookAlarm(currentUserId),
    enabled: !!currentUserId
  });
  return { guestbookAlarms, guestbookAlarmLoading };
};

export const useMarkCommentsAsRead = () => {
  const queryClient = useQueryClient();
  const { mutate: markAsRead } = useMutation({
    mutationFn: ({ comment_id }: { comment_id: string }) => updateCommentsRead(comment_id),
    onSuccess: async () => await queryClient.invalidateQueries({ queryKey: [ALARM_QUIZ_COMMENTS_QUERY_KEY] })
  });
  return { mutate: markAsRead };
};

export const useMarkGuestbookAsRead = () => {
  const queryClient = useQueryClient();
  const { mutate: markAsRead } = useMutation({
    mutationFn: ({ guestbook_id }: { guestbook_id: string }) => updateGuestbookRead(guestbook_id),
    onSuccess: async () => await queryClient.invalidateQueries({ queryKey: [ALARM_GUESTBOOK_QUERY_KEY] })
  });
  return { mutate: markAsRead };
};
