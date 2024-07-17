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
