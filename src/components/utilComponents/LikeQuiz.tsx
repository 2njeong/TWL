'use client';

import { submitQuizLike } from '@/app/quiz/solve/action';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState, useTransition } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Tables } from '@/type/database';
import { CURRENT_USER_QUERY_KEY } from '@/query/auth/authQueryKeys';

type LikeQuizProps = {
  quiz_id: string | undefined;
  quizLikeUsers: string[];
  queryKey: (string | undefined)[];
};

const LikeQuiz = (likeQuizProps: LikeQuizProps) => {
  const { quiz_id, quizLikeUsers, queryKey } = likeQuizProps;
  const queryClient = useQueryClient();
  const { user_id: currentUserID } = queryClient.getQueryData<Tables<'users'>>([CURRENT_USER_QUERY_KEY]) ?? {};
  const [isLiked, setIsLiked] = useState(currentUserID && quizLikeUsers && quizLikeUsers.includes(currentUserID));
  const [isPending, startTransition] = useTransition();
  console.log('isLiked =>', isLiked);

  useEffect(() => {
    setIsLiked(currentUserID && quizLikeUsers && quizLikeUsers.includes(currentUserID));
  }, [quizLikeUsers, currentUserID]);

  useEffect(() => {
    isPending && setIsLiked((prev) => !prev);
  }, [isPending]);

  const handleSubmitLike = async () => {
    startTransition(async () => {
      if (currentUserID) {
        await submitQuizLike(quiz_id, currentUserID);
        queryClient.invalidateQueries({ queryKey });
      }
    });
  };

  return (
    <>
      <form action={handleSubmitLike}>
        <button type="submit" name="like" className="flex items-center" disabled={isPending}>
          {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
        </button>
      </form>
    </>
  );
};

export default LikeQuiz;
