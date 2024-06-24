export const fetchQuizList = async ({ pageParam = 1 }: any) => {
  const response = await fetch(`/quiz/api?pageParam=${pageParam}`);
  if (!response.ok) {
    throw new Error('quizList response was not ok');
  }
  return response.json();
};
