'use client';

import { submitQuizLike } from '@/app/quiz/solve/action';
import { useFetchCurrentUser } from '@/customHooks/useQueries/useAuthQuery';
import { clientSupabase } from '@/supabase/client';

const LikeQuiz = ({ quiz_id }: { quiz_id: string }) => {
  const { data, isLoggedIn } = useFetchCurrentUser();
  console.log(data);

  const submitQuizLikeClient = async (quiz_id: string, user_id: string) => {
    const supabase = clientSupabase();
    const { error } = await supabase.rpc('append_user_id_to_quiz_like', { quiz_id, user_id });
    if (error) throw new Error(error.message);
  };

  //   const aaa = async (quiz_id: string, user_id: string) => {
  //     const object = { quiz_id, user_id };
  //     try {
  //       const response = await fetch('/api/dailyroute', {
  //         method: 'POST',
  //         body: JSON.stringify(object),
  //         headers: {
  //           'Content-Type': 'application/json'
  //         }
  //       });
  //       if (!response.ok) {
  //         const error = await response.json();
  //         throw new Error(error.message);
  //       }
  //       const data = await response.json();
  //       console.log('응답결과', data);
  //       return data;
  //     } catch (error) {
  //       throw new Error('음음 fetch fail');
  //     }
  //   };

  return (
    <>
      <form
        action={async () => {
          await submitQuizLike(quiz_id, data.user_id);
        }}
      >
        <button type="submit" name="like">
          Server 좋아요
        </button>
      </form>
      <button onClick={async () => await submitQuizLikeClient(quiz_id, data.user_id)}>client 좋아요</button>
    </>
  );
};

export default LikeQuiz;
