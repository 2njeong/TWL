import { QuizCommentsAlarm } from '@/type/alarmType';

export const fetchQuizCommentsAlarm = async (currentUserId: string | undefined): Promise<QuizCommentsAlarm[]> => {
  const response = await fetch(`/auth/api?type=quizCommentsAlarm&currentUserId=${currentUserId}`);
  if (!response.ok) {
    throw new Error('quizCommentsAlarm response was not ok');
  }
  return response.json();
};

export const updateCommentsRead = async (comment_id: string) => {
  const response = await fetch('/auth/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ p_comment_id: comment_id })
  });

  if (!response.ok) {
    throw new Error('Failed to update comment read');
  }
  const result = await response.json();
  console.log('API Response result:', result);

  return result.comment_id;
};
