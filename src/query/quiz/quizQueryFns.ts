import { FETCHMORENUM } from '@/constants/quizConstants';
import { clientSupabase } from '@/supabase/client';

export const fetchQuizList = async ({ pageParam = 1 }: any) => {
  // console.log('pageParam => ', pageParam);
  // const supabase = clientSupabase();
  // const { data, error } = await supabase
  //   .from('quiz')
  //   .select('*')
  //   .order('created_at', { ascending: false })
  //   .range((pageParam - 1) * FETCHMORENUM, pageParam * FETCHMORENUM - 1);
  // if (error) throw new Error('fail to select quizList');
  // return data;
  const response = await fetch(`/quiz/api?pageParam=${pageParam}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
