export const fetchQuizList = async ({ pageParam = 1 }: any) => {
  const response = await fetch(`/quiz/api?type=list&pageParam=${pageParam}`);
  if (!response.ok) {
    throw new Error('quizList response was not ok');
  }
  return response.json();
};

export const fetchQuizLike = async () => {
  const response = await fetch('/quiz/api?type=like');
  if (!response.ok) {
    throw new Error('quizLike response was not ok');
  }
  return response.json();
};
