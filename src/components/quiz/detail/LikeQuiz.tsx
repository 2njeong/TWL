'use client';

import { submitQuizLike } from '@/app/quiz/solve/action';
import { useFetchCurrentUser } from '@/query/useQueries/useAuthQuery';
import { useQuizLike } from '@/query/useQueries/useQuizQuery';
import { QUIZLIKE_QUERY_KEY } from '@/query/quiz/quizQueryKeys';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState, useTransition } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const LikeQuiz = ({ quiz_id }: { quiz_id: string }) => {
  const { userData, isLoggedIn } = useFetchCurrentUser();
  const { data: quizLikeData } = useQuizLike(quiz_id);
  const [isLiked, setIsLiked] = useState(userData && quizLikeData && quizLikeData.users?.includes(userData.user_id));
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  console.log('isPending =>', isPending);

  useEffect(() => {
    setIsLiked(userData && quizLikeData && quizLikeData.users?.includes(userData.user_id));
  }, [quizLikeData, userData]);

  useEffect(() => {
    isPending && setIsLiked((prev) => !prev);
  }, [isPending]);

  const handleSubmitLike = async () => {
    startTransition(async () => {
      if (!isLoggedIn) {
        alert('로그인 후 이용해주세요.');
        return;
      }
      await submitQuizLike(quiz_id, userData?.user_id ?? '');
      queryClient.invalidateQueries({ queryKey: [QUIZLIKE_QUERY_KEY, quiz_id] });
    });
  };

  // const submitQuizLikeClient = async (quiz_id: string, user_id: string) => {
  //   // const supabase = clientSupabase();
  //   // const { error } = await supabase.rpc('append_user_id_to_quiz_like', { quiz_id, user_id });
  //   // if (error) throw new Error(error.message);

  //   const object = { quiz_id, user_id };
  //   try {
  //     const response = await fetch('/quiz/api', {
  //       method: 'POST',
  //       body: JSON.stringify(object),
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     });
  //     if (!response.ok) {
  //       const error = await response.json();
  //       throw new Error(error.message);
  //     }
  //     const data = await response.json();
  //     console.log('응답결과', data);
  //     return data;
  //   } catch (error) {
  //     throw new Error('음음 fetch fail');
  //   }
  // };

  // console.log('isLiked ====>>', isLiked);
  // console.log('-----------------------------------');
  return (
    <>
      <form action={handleSubmitLike}>
        <button type="submit" name="like">
          {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
        </button>
      </form>
    </>
  );
};

export default LikeQuiz;
