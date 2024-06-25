'use client';

import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/i18n/ko-kr';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { useEffect, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import { answerAtom, editorContentAtom, quizTyper } from '@/atom/quizAtom';

const SubjectiveQuiz = () => {
  const contentEditorRef = useRef<Editor>(null);
  const answerEditorRef = useRef<Editor>(null);
  const [quizType] = useAtom(quizTyper);
  const [contentData, setContentData] = useAtom(editorContentAtom);
  const [answer, setAnswer] = useAtom(answerAtom);
  const [contentEditorType, setContentEditorType] = useState('wysiwyg');
  const [answerEditorType, setAnswerEditorType] = useState('wysiwyg');

  console.log('answer =>', answer);
  console.log('contentData =>', contentData);

  useEffect(() => {
    if (!contentData && !answer) {
      // Editor 초기화
      if (contentEditorRef.current) {
        contentEditorRef.current.getInstance().reset();
      }
      if (answerEditorRef.current) {
        answerEditorRef.current.getInstance().reset();
      }
    }
  }, [contentData, answer, quizType]);

  const onQuizChange = () => {
    let data;
    if (contentEditorType === 'wysiwyg') {
      data = contentEditorRef.current?.getInstance().getHTML();
      setContentData(data);
    } else {
      data = contentEditorRef.current?.getInstance().getMarkdown();
      setContentData(data);
    }
  };
  const onAnswerChange = () => {
    let data;
    if (answerEditorType === 'wysiwyg') {
      data = answerEditorRef.current?.getInstance().getHTML();
      setAnswer([data]);
    } else {
      data = answerEditorRef.current?.getInstance().getMarkdown();
      setAnswer([data]);
    }
  };

  const onContentChangeMarkdownToWysiwyg = () => {
    setContentEditorType((prev) => (prev === 'wysiwyg' ? 'markdown' : 'wysiwyg'));
  };

  const onAnswerChangeMarkdownToWysiwyg = () => {
    setAnswerEditorType((prev) => (prev === 'wysiwyg' ? 'markdown' : 'wysiwyg'));
  };

  return (
    <>
      <Editor
        placeholder="문제를 제출해주세요."
        previewStyle="vertical"
        height="500px"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        language="ko-KR"
        toolbarItems={[
          // 툴바 옵션 설정
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task', 'indent', 'outdent'],
          ['table', 'image', 'link'],
          ['code', 'codeblock']
        ]}
        plugins={[colorSyntax]}
        ref={contentEditorRef}
        onChange={onQuizChange}
        onBeforeConvertWysiwygToMarkdown={onContentChangeMarkdownToWysiwyg}
      />
      <Editor
        placeholder="정답을 알려주세요."
        previewStyle="vertical"
        height="300px"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        language="ko-KR"
        toolbarItems={[
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task', 'indent', 'outdent'],
          ['table', 'image', 'link'],
          ['code', 'codeblock']
        ]}
        plugins={[colorSyntax]}
        ref={answerEditorRef}
        onChange={onAnswerChange}
        onBeforeConvertWysiwygToMarkdown={onAnswerChangeMarkdownToWysiwyg}
      />
    </>
  );
};

export default SubjectiveQuiz;
