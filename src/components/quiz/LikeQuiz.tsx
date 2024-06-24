'use client';

import { submitQuizLike } from '@/app/quiz/solve/action';
import { useFetchCurrentUser } from '@/customHooks/useQueries/useAuthQuery';
import { useQuizLike } from '@/customHooks/useQueries/useQuizQuery';
import { QUIZLIKE_QUERY_KEY } from '@/query/quiz/quizQueryKeys';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const LikeQuiz = ({ quiz_id }: { quiz_id: string }) => {
  const [isLiked, setIsLiked] = useState(false);
  const { data, isLoggedIn } = useFetchCurrentUser();
  const { data: quizLikeData, isLoading } = useQuizLike(quiz_id);

  const queryClient = useQueryClient();

  const handleSubmitLike = async () => {
    if (!isLoggedIn) {
      alert('로그인 후 이용해주세요.');
      return;
    }

    await setIsLiked((prev) => !prev);
    await submitQuizLike(quiz_id, data?.user_id ?? '');
    queryClient.invalidateQueries({ queryKey: [QUIZLIKE_QUERY_KEY] });
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

  if (isLoading) return;
  return (
    <>
      <form action={handleSubmitLike}>
        <button type="submit" name="like">
          {(data && quizLikeData?.users.includes(data.user_id)) || isLiked ? (
            <FaHeart className="text-red-500" />
          ) : (
            <FaRegHeart />
          )}
        </button>
      </form>

      {/* <button onClick={async () => await submitQuizLikeClient(quiz_id, data.user_id)}>client 좋아요</button> */}
    </>
  );
};

export default LikeQuiz;
