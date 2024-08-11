'use client';

import { useGetCurrentUser } from '@/customHooks/common';
import { useFetchQuizCommentsAlarms, useMarkAsRead } from '@/query/useQueries/useAlarmQuery';
import { useRouter } from 'next/navigation';

const QuizCommentsAlarm = () => {
  const userData = useGetCurrentUser();
  const { quizCommentsLoading, quizCommentsAlarms } = useFetchQuizCommentsAlarms(userData?.user_id);
  const { mutate: markAsRead } = useMarkAsRead();
  const router = useRouter();

  const goToDetailQuiz = (quiz_id: string, comment_id: string) => {
    markAsRead({ comment_id });
    router.push(`/quiz/solve/${quiz_id}`);
  };

  if (quizCommentsLoading)
    return <div className="w-full flex items-center justify-center text-gray-500">새로운 알림 로딩중..</div>;
  return (
    <div className="flex flex-col gap-1">
      {quizCommentsAlarms?.map((alarm) => (
        <button
          key={alarm.comments.comment_id}
          onClick={() => goToDetailQuiz(alarm.quiz_id, alarm.comments.comment_id)}
          className="w-full flex flex-col rounded hover:bg-gray-100 p-1 gap-0.5 text-left"
        >
          <div className="w-full flex text-sm text-gray-500 truncate">
            <p className="text-green-500">{alarm.comments.creator_nickname}</p>
            <p>님이 댓글을 남겼습니다.</p>
          </div>

          <h4 className="text-xs font-semiblod text-gray-500">Q. {alarm.question}</h4>
          <p className="text-xs text-gray-400 break-all whitespace-normal line-clamp-2">
            {alarm.comments.comment_content}
          </p>
        </button>
      ))}
    </div>
  );
};

export default QuizCommentsAlarm;
