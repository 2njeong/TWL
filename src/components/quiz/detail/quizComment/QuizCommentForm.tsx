'use client';

import { FormEvent, RefObject, useEffect, useRef, useState } from 'react';
import QuizCommentBtn from './QuizCommentSubmitBtn';
import { QuizCommentValidationErr } from '@/type/quizType';
import { handleQuizComment } from '@/app/quiz/solve/action';
import { useFormState } from 'react-dom';
import { Tables } from '@/type/database';
import { useQueryClient } from '@tanstack/react-query';
import { QUIZ_COMMENTS_QUERY_KEY } from '@/query/quiz/quizQueryKeys';
import { useAtom } from 'jotai';
import { checkLoginAtom } from '@/atom/authAtom';
import AvatarImage from '@/components/member/information/AvatarImage';
import { useGetCurrentUser } from '@/customHooks/common';
import { useFetchAllUsers } from '@/query/useQueries/useAuthQuery';

const QuizCommentForm = ({
  theQuiz,
  commentFormRef
}: {
  theQuiz: Tables<'quiz'> | undefined;
  commentFormRef: RefObject<HTMLFormElement> | null;
}) => {
  const { allUsersLoading, allUsers } = useFetchAllUsers();
  const [isCommentOpen, setCommentOpen] = useState(false);
  const [input, setInput] = useState('');
  const [suggestedUsers, setSuggestedUsers] = useState<Tables<'users'>[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [taggedUser, setTaggedUser] = useState<string[]>([]);
  const [commentValidationErr, setCommentValidationErr] = useState<QuizCommentValidationErr | null>(null);
  const commentTxtAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const queryClient = useQueryClient();
  const { user_id, avatar } = useGetCurrentUser() ?? {};
  const [isLoggedIn, __] = useAtom(checkLoginAtom);

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
    const quizCommentObj = { comment_creator: user_id, quiz_id: theQuiz?.quiz_id, taggedUser };
    const result = await handleQuizComment(data, quizCommentObj);
    if (result?.error) setCommentValidationErr(result.error);
    await queryClient.invalidateQueries({ queryKey: [QUIZ_COMMENTS_QUERY_KEY, theQuiz?.quiz_id] });
    commentFormRef?.current?.reset();
    setInput('');
  };

  const [_, formAction] = useFormState(submitQuizComment, null);

  const handleTextareaInput = () => {
    const textarea = commentTxtAreaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // 기존 높이 초기화
      textarea.style.height = `${textarea.scrollHeight}px`; // 내용에 맞춰 높이 조정
    }
  };

  const handleInputChange = (e: FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    const value = target.value;
    setInput(value);
    const lastWord = value.split(' ').pop();
    if (lastWord?.includes('@')) {
      setShowSuggestions(true);
      const query = lastWord.slice(1).toLowerCase();
      const filterdUsers = allUsers?.filter((user) => user.nickname?.toLowerCase().startsWith(query));
      filterdUsers && setSuggestedUsers(filterdUsers);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleInput = (e: FormEvent<HTMLTextAreaElement>) => {
    handleTextareaInput();
    handleInputChange(e);
  };

  const handleSuggestionClick = (user: Tables<'users'>) => {
    const words = input.split(' ');
    words.pop();
    words.push(`@${user.nickname}`);
    setTaggedUser((prev) => [...prev, user.user_id]);
    setInput(words.join(' ') + ' ');
    setShowSuggestions(false);
  };

  return (
    <form
      ref={commentFormRef}
      action={formAction}
      className="w-full flex items-center border rounded justify-between h-auto p-4"
    >
      <div className="w-14 h-14">
        <AvatarImage src={avatar} alt="유저이미지" size="3.5" />
      </div>
      <div className={`${isCommentOpen ? 'w-[80%]' : 'w-11/12'} flex flex-col gap-1 relative`}>
        <textarea
          name="comment_content"
          placeholder={`${isLoggedIn ? '댓글 작성...' : '로그인 후 이용 가능합니다.'}`}
          value={input}
          ref={commentTxtAreaRef}
          disabled={!isLoggedIn}
          className="border-b-2 focus:outline-none resize-none min-h-5 overflow-y-hidden"
          onInput={(e) => handleInput(e)}
          rows={1}
        ></textarea>
        {!allUsersLoading && showSuggestions && (
          <div className="absolute translate-y-[20px] w-48 max-h-56 overflow-y-auto flex flex-col gap-1 bg-white bg-opacity-70">
            {suggestedUsers.map((user) => (
              <button key={user.user_id} onClick={() => handleSuggestionClick(user)} className="hover:bg-gray-100">
                {user.nickname}
              </button>
            ))}
          </div>
        )}
        {<p>{commentValidationErr?.comment_content?._errors}</p>}
      </div>
      <QuizCommentBtn isCommentOpen={isCommentOpen} setCommentOpen={setCommentOpen} commentFormRef={commentFormRef} />
    </form>
  );
};

export default QuizCommentForm;
