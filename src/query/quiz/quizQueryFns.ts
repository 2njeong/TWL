import { Tables } from '@/type/database';

export const fetchQuizList = async ({ pageParam = 1 }: any) => {
  const response = await fetch(`/quiz/api?type=list&pageParam=${pageParam}`);
  if (!response.ok) {
    throw new Error('QuizList response was not ok');
  }
  return response.json();
};

export const fetchQuizLike = async (quiz_id: string) => {
  const response = await fetch(`/quiz/api?type=like&quiz_id=${quiz_id}`);
  if (!response.ok) {
    throw new Error('QuizLike response was not ok');
  }
  return response.json();
};

export const fetchThisCreatorsQuiz = async (creator: string): Promise<Tables<'quiz'>> => {
  const response = await fetch(`/quiz/api?type=thisCreatorQuiz&creator=${creator}`);
  if (!response.ok) throw new Error('The quiz response of this creator was not ok');
  return response.json();
};
