import { submitQuizAction } from '@/app/quiz/makequiz/action';
import { QUIZLIST_QUERY_KEY } from '@/query/quizQueryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddQuiz = () => {
  const queryClient = useQueryClient();
  const { mutate: addNewQuiz } = useMutation({
    mutationFn: ({ answer, data }: { answer: null | string[]; data: FormData }) => submitQuizAction(answer, data),
    onSuccess: async () => await queryClient.invalidateQueries({ queryKey: [QUIZLIST_QUERY_KEY] })
  });
  return { mutate: addNewQuiz };
};
