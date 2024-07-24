import { CURRENT_USER_QUERY_KEY, THAT_USER_QUERY_KEY } from '@/query/auth/authQueryKeys';
import { TODOLIST_QUERY_KEY } from '@/query/member/memberQueryKey';
import { Tables } from '@/type/database';
import { SevenDaysTodolist } from '@/type/memberType';
import { useQueryClient } from '@tanstack/react-query';
import { Editor } from '@toast-ui/react-editor';
import { useRef, useState } from 'react';

export const useEditor = (setData: (data: any) => void) => {
  const [answerType, setAnswerType] = useState('wysiwyg');
  const editorRef = useRef<Editor>(null);
  const handleContentResultChange = () => {
    let data;
    if (answerType === 'wysiwyg') {
      data = editorRef.current?.getInstance().getHTML();
      setData(data);
    } else {
      data = editorRef.current?.getInstance().getMarkdown();
      setData(data);
    }
  };
  const handleChangeMarkdownToWysiwyg = () => {
    setAnswerType((prev) => (prev === 'wysiwyg' ? 'markdown' : 'wysiwyg'));
  };

  return { editorRef, handleContentResultChange, handleChangeMarkdownToWysiwyg };
};

export const useHoverEvent = () => {
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsCreatorOpen(true);
  };

  const handleMouseLeave = () => {
    setIsCreatorOpen(false);
  };

  const handleTouchMove = (e: React.TouchEvent<Element>) => setIsCreatorOpen(!!e);

  const events = () => ({
    onMouseEnter: () => handleMouseEnter(),
    onMouseLeave: () => handleMouseLeave(),
    onTouchMove: (e: React.TouchEvent<Element>) => handleTouchMove(e)
  });

  return { isCreatorOpen, events };
};

export const useGetCurrentUser = () => {
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData<Tables<'users'> | undefined>([CURRENT_USER_QUERY_KEY]);
  return userData;
};

export const useGetThatUser = (id: string) => {
  const queryClient = useQueryClient();
  const [data] = queryClient.getQueryData<Tables<'users'>[]>([THAT_USER_QUERY_KEY, id]) ?? [];
  return data;
};

export const useGetSevenDaysTodolist = (thatUserID: string) => {
  const queryClient = useQueryClient();
  const sevenDaysTodolist = queryClient.getQueryData<SevenDaysTodolist[]>([TODOLIST_QUERY_KEY, thatUserID]);
  return sevenDaysTodolist;
};
