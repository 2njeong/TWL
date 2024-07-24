'use client';

import { submitQuizLike } from '@/app/quiz/solve/action';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState, useTransition } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useAtom } from 'jotai';
import { checkLoginAtom } from '@/atom/authAtom';
import { useGetCurrentUser } from '@/customHooks/common';

type LikeQuizProps = {
  quiz_id: string | undefined;
  creator: string | undefined;
  quizLikeUsers: string[];
  queryKey: (string | undefined)[];
};

const LikeQuiz = (likeQuizProps: LikeQuizProps) => {
  const { quiz_id, creator, quizLikeUsers, queryKey } = likeQuizProps;
  const { user_id: currentUserID } = useGetCurrentUser() ?? {};
  const [isLiked, setIsLiked] = useState(currentUserID && quizLikeUsers && quizLikeUsers.includes(currentUserID));
  const [likesLength, setLikesLength] = useState(quizLikeUsers.length);
  const [isLoggedIn, _] = useAtom(checkLoginAtom);
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  useEffect(() => {
    setIsLiked(currentUserID && quizLikeUsers && quizLikeUsers.includes(currentUserID));
  }, [quizLikeUsers, currentUserID]);

  useEffect(() => {
    isPending && setIsLiked((prev) => !prev);
  }, [isPending]);

  useEffect(() => {
    setLikesLength(quizLikeUsers.length);
  }, [quizLikeUsers]);

  const handleSubmitLike = async () => {
    if (!isLoggedIn) {
      alert('로그인 후 이용해주세요.');
      return;
    }
    if (creator === currentUserID) {
      alert('본인의 퀴즈에 좋아요를 누를 수 없습니다.');
      return;
    }
    startTransition(async () => {
      if (currentUserID) {
        await submitQuizLike(quiz_id, currentUserID);
        queryClient.invalidateQueries({ queryKey });
      }
    });
  };

  return (
    <form action={handleSubmitLike} className="flex items-center gap-2">
      <button type="submit" name="like" className="flex items-center" disabled={isPending}>
        {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
      </button>
      <h4>{quizLikeUsers.length}</h4>
    </form>
  );
};

export default LikeQuiz;
