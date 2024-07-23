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
