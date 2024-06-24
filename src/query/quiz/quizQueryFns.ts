export const fetchQuizList = async ({ pageParam = 1 }: any) => {
  const response = await fetch(`/quiz/api?type=list&pageParam=${pageParam}`);
  if (!response.ok) {
    throw new Error('quizList response was not ok');
  }
  return response.json();
};

export const fetchQuizLike = async (quiz_id: string) => {
  const response = await fetch(`/quiz/api?type=like&quiz_id=${quiz_id}`);
  if (!response.ok) {
    throw new Error('quizLike response was not ok');
  }
  return response.json();
};
