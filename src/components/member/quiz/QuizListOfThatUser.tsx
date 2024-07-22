'use client';

import LikeQuiz from '@/components/utilComponents/LikeQuiz';
import { THAT_USER_QUERY_KEY } from '@/query/auth/authQueryKeys';
import { QUIZLIST_OF_THATUSER } from '@/query/member/memberQueryKey';
import { useFetchQuizlistOfThatUser } from '@/query/useQueries/useMemberQuery';
import { Tables } from '@/type/database';
import { getformattedDate } from '@/utils/utilFns';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

const QuizListOfThatUser = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();
  const [{ user_id: thatUserID }] = queryClient.getQueryData<Tables<'users'>[]>([THAT_USER_QUERY_KEY, id]) ?? [];
  const { quizListOfThatUser, hasNextPage, isFetchingNextPage, fetchNextPage, quizListOfThatUserLoading } =
    useFetchQuizlistOfThatUser(thatUserID);

  const { ref } = useInView({
    threshold: 0.5,
    onChange: (inView) => {
      if (!inView || !hasNextPage || isFetchingNextPage) return;
      fetchNextPage();
    }
  });

  if (quizListOfThatUserLoading)
    return <div className="w-full h-full flex justify-center items-center">쥔장 quiz리스트 로딩중...</div>;
  return (
    <div className="w-full h-full overflow-y-auto flex flex-col items-center gap-3 bg-white bg-opacity-80 p-2">
      {quizListOfThatUser?.map((quiz) => (
        <div
          key={quiz.quiz_id}
          className="border-2 border-dashed border-green-200 rounded drop-shadow-sm w-full max-w-[35rem] flex flex-col items-center p-4 gap-2"
        >
          <div className="w-full flex items-center justify-between">
            <h3 className="font-bold text-xl truncate text-green-900">Q. {quiz.question}</h3>
            <Link
              href={`/quiz/solve/${quiz.quiz_id}`}
              className="border-2 border-green-400 hover:border-white hover:bg-green-200 rounded px-1 py-0.5"
            >
              보러가기
            </Link>
          </div>
          <div className="w-full flex justify-start items-center px-1">
            <div className="bg-yellow-100 rounded-lg px-1">{quiz.isSubjective ? '주관식' : '객관식'}</div>
          </div>
          <div className="w-full flex justify-between items-center gap-2">
            <p className="text-sm text-gray-500">{getformattedDate(quiz.created_at)}</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <LikeQuiz
                  quiz_id={quiz.quiz_id}
                  creator={quiz.creator}
                  quizLikeUsers={quiz.quiz_like?.users ?? []}
                  queryKey={[QUIZLIST_OF_THATUSER, thatUserID]}
                />
                <h5>
                  {quiz.quiz_like &&
                    quiz.quiz_like.users &&
                    quiz.quiz_like.users.length > 0 &&
                    quiz.quiz_like.users.length}
                </h5>
              </div>
              <h5>댓글 {quiz.comments.length}</h5>
            </div>
          </div>
        </div>
      ))}
      <div ref={ref} className="w-full h-20 flex justify-center items-center">
        {hasNextPage ? isFetchingNextPage ? <p>로딩중...</p> : <p>더보기</p> : null}
      </div>
    </div>
  );
};

export default QuizListOfThatUser;
