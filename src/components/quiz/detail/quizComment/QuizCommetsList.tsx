'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useQuizCommentsQuery } from '@/query/useQueries/useQuizQuery';
import { getformattedDate, getHoursDifference } from '@/utils/utilFns';
import DeleteBtn from '../../../utilComponents/DeleteBtn';
import { Tables } from '@/type/database';
import { QUIZ_COMMENTS_QUERY_KEY } from '@/query/quiz/quizQueryKeys';
import { useQueryClient } from '@tanstack/react-query';
import { CURRENT_USER_QUERY_KEY } from '@/query/auth/authQueryKeys';
import AvatarImage from '@/components/member/information/AvatarImage';

const QuizCommentsList = ({ theQuiz }: { theQuiz: Tables<'quiz'> | undefined }) => {
  const queryClient = useQueryClient();
  const { user_id: currentUserId } = queryClient.getQueryData<Tables<'users'>>([CURRENT_USER_QUERY_KEY]) ?? {};
  const {
    data: quizComments,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isRefetching,
    isLoading
  } = useQuizCommentsQuery(theQuiz?.quiz_id as string);
  const targetRef = useRef<HTMLDivElement | null>(null);

  console.log('quizComments =>', quizComments);

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    const viewportHeight = window.innerHeight;

    if (targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      const targetTop = rect.top + scrollPosition;
      const targetPosition = targetTop + rect.height * 0.5;
      if (targetPosition <= scrollPosition + viewportHeight) {
        if (!hasNextPage || isFetchingNextPage) return;
        fetchNextPage();
      }
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll]);

  const deleteBtnProps = {
    item: 'comments',
    queryKey: QUIZ_COMMENTS_QUERY_KEY,
    additionalKey: [theQuiz?.quiz_id as string],
    containerClassName: 'w-8',
    btnContainerClassName: 'w-7 h-7',
    btnClassName: 'text-xl cursor-pointer',
    hoverContainerClassName: 'w-14 h-7 p-1 -bottom-8 -left-6',
    hoverBtnClassName: 'text-sm'
  };

  if (isLoading) return <div>댓글 로딩중..</div>;
  return (
    <>
      <section className="flex flex-col gap-2 w-full">
        {quizComments?.filter((comment) => !comment.isDeleted).length ? (
          quizComments?.map(
            (comment) =>
              !comment.isDeleted && (
                <div key={comment.comment_id} className="flex gap-4 border-b p-2 h-full min-h-20">
                  <div>
                    <AvatarImage src={comment.avatar} alt="댓글 주인 아바타" size="3.5" />
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <div className="w-full flex gap-2 items-center justify-between min-h-8">
                      <div className="w-full flex gap-2 items-center justify-between">
                        <p className="text-sm text-gray-500 font-bold">@&nbsp;{comment.nickname}</p>

                        {getHoursDifference(comment.created_at).hours < 48 ? (
                          <p className="text-xs text-gray-500">
                            {getHoursDifference(comment.created_at).hours > 0 &&
                              `${getHoursDifference(comment.created_at).hours}시간`}{' '}
                            {getHoursDifference(comment.created_at).minutes}분 전
                          </p>
                        ) : (
                          <p className="text-xs">{getformattedDate(comment.created_at)}</p>
                        )}
                      </div>
                      {comment.comment_creator === currentUserId && (
                        <DeleteBtn item_id={comment.comment_id} {...deleteBtnProps} />
                      )}
                    </div>
                    <div className="w-full px-2">
                      <p className="break-all whitespace-normal overflow-wrap"> {comment.comment_content}</p>
                    </div>
                  </div>
                </div>
              )
          )
        ) : (
          <div className="w-full h-20 flex justify-center items-center ">
            <p className="text-gray-500">아직 댓글이 없습니다.</p>
          </div>
        )}
      </section>
      <div ref={targetRef} className="w-96 h-28 flex justify-center items-center">
        {isFetchingNextPage && <p>로딩중...</p>}
      </div>
    </>
  );
};

export default QuizCommentsList;
