'use client';

import { RefObject, useEffect, useRef, useState } from 'react';
import QuizCommentBtn from './QuizCommentSubmitBtn';
import { QuizCommentValidationErr } from '@/type/quizType';
import { handleQuizComment } from '@/app/quiz/solve/action';
import { useFormState } from 'react-dom';
import { Tables } from '@/type/database';

const QuizCommentForm = ({
  theQuiz,
  user_id,
  commentFormRef
}: {
  theQuiz: Tables<'quiz'> | undefined;
  user_id: string | undefined;
  commentFormRef: RefObject<HTMLFormElement> | null;
}) => {
  const [isCommentOpen, setCommentOpen] = useState(false);
  const [commentValidationErr, setCommentValidationErr] = useState<QuizCommentValidationErr | null>(null);
  const commentTxtAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (commentFormRef) {
        if (commentFormRef.current && !commentFormRef.current.contains(event.target)) {
          setCommentOpen(false);
        } else if (commentFormRef.current && commentFormRef.current.contains(event.target)) {
          setCommentOpen(true);
        }
        setCommentValidationErr(null);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const submitQuizComment = async (state: any, data: FormData) => {
    const boundHandleQuizComment = handleQuizComment.bind(null, user_id, theQuiz?.quiz_id);
    const result = await boundHandleQuizComment(data);
    if (result?.error) setCommentValidationErr(result.error);
    commentFormRef?.current?.reset();
  };

  const [_, formAction] = useFormState(submitQuizComment, null);

  const handleTextareaInput = () => {
    const textarea = commentTxtAreaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // 기존 높이 초기화
      textarea.style.height = `${textarea.scrollHeight}px`; // 내용에 맞춰 높이 조정
    }
  };

  return (
    <form ref={commentFormRef} action={formAction} className="w-11/12 flex gap-4 items-center border h-auto p-4">
      <div>
        <div className="w-14 h-14 rounded-full bg-gray-300">아바타</div>
      </div>
      <div className={`${isCommentOpen ? 'w-11/12' : 'w-full'} flex flex-col gap-1 w-full`}>
        <textarea
          name="comment_content"
          placeholder="댓글 작성..."
          ref={commentTxtAreaRef}
          className="border-b focus:outline-none resize-none min-h-5 overflow-y-hidden"
          onInput={handleTextareaInput}
          rows={1}
        ></textarea>
        {<p>{commentValidationErr?.comment_content?._errors}</p>}
      </div>
      <QuizCommentBtn isCommentOpen={isCommentOpen} setCommentOpen={setCommentOpen} commentFormRef={commentFormRef} />
    </form>
  );
};

export default QuizCommentForm;
