'use client';

import { useMarkCommentsAsRead } from '@/query/useQueries/useAlarmQuery';
import { useRouter } from 'next/navigation';
import type { QuizCommentsAlarm } from '@/type/alarmType';
import { MdCancel } from 'react-icons/md';
import { useQueryClient } from '@tanstack/react-query';
import { ALARM_QUIZ_COMMENTS_QUERY_KEY } from '@/query/alarm/alarmQueryKey';

const QuizCommentsAlarm = ({ quizCommentsAlarms }: { quizCommentsAlarms: QuizCommentsAlarm[] | undefined }) => {
  const { mutate: markAsRead } = useMarkCommentsAsRead();
  const router = useRouter();
  const queryClient = useQueryClient();

  const goToDetailQuiz = (quiz_id: string, comment_id: string) => {
    markAsRead({ comment_id });
    router.push(`/quiz/solve/${quiz_id}`);
  };

  const turnOffAlarm = (item_uuid: string, comment_id: string) => {
    queryClient.setQueryData<QuizCommentsAlarm[] | undefined>(
      [ALARM_QUIZ_COMMENTS_QUERY_KEY],
      (prev) => prev && prev.filter((comment) => comment.item_uuid !== item_uuid)
    );
    markAsRead({ comment_id });
  };

  return (
    <div className="flex flex-col gap-1">
      {quizCommentsAlarms?.map((alarm) => (
        <div
          key={alarm.comments.comment_id}
          onClick={() => goToDetailQuiz(alarm.quiz_id, alarm.comments.comment_id)}
          className="cursor-pointer w-full flex flex-col rounded hover:bg-gray-100 p-1 gap-0.5 text-left relative"
        >
          <button
            onClick={(event) => {
              event.stopPropagation();
              turnOffAlarm(alarm.item_uuid, alarm.comments.comment_id);
            }}
            className="w-4 h-4 rounded-full absolute top-[5px] right-[5px] z-[5]"
          >
            <MdCancel className="text-gray-300 hover:text-gray-400" />
          </button>
          <div className="w-full flex text-sm text-gray-500 truncate">
            <p
              className={`font-semibold ${
                alarm.comments.selected_due_to === 'quiz_creator' ? 'text-green-500' : 'text-blue-500'
              }`}
            >
              {alarm.comments.creator_nickname}
            </p>
            <p>
              {alarm.comments.selected_due_to === 'quiz_creator'
                ? '님이 댓글을 남겼습니다.'
                : '님이 회원님을 언급했습니다.'}
            </p>
          </div>
          <h4 className="text-xs font-semiblod text-gray-400">Q . {alarm.question}</h4>
          <p className="text-xs text-gray-600 break-all whitespace-normal line-clamp-2">
            {alarm.comments.comment_content}
          </p>
        </div>
      ))}
    </div>
  );
};

export default QuizCommentsAlarm;
