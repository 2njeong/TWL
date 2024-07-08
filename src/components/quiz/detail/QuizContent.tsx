'use client';

import { Tables } from '@/type/database';
import { Editor, Viewer } from '@toast-ui/react-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { useEditor } from '@/customHooks/common';

const QuizContent = ({
  theQuiz,
  clickList,
  setClickList,
  setSubjectiveAnswer
}: {
  theQuiz: Tables<'quiz'> | undefined;
  clickList: boolean[];
  setClickList: Dispatch<SetStateAction<boolean[]>>;
  setSubjectiveAnswer: Dispatch<SetStateAction<string>>;
}) => {
  // const subjectiveAnswerRef = useRef<Editor>(null);
  // const [answerType, setAnswerType] = useState('wysiwyg');

  // const handleSubjectiveAnswerChange = () => {
  //   let data;
  //   if (answerType === 'wysiwyg') {
  //     data = subjectiveAnswerRef.current?.getInstance().getHTML();
  //     setSubjectiveAnswer(data);
  //   } else {
  //     data = subjectiveAnswerRef.current?.getInstance().getMarkdown();
  //     setSubjectiveAnswer(data);
  //   }
  // };

  // const handleAnswerChangeMarkdownToWysiwyg = () => {
  //   setAnswerType((prev) => (prev === 'wysiwyg' ? 'markdown' : 'wysiwyg'));
  // };

  const {
    editorRef: subjectiveAnswerRef,
    handleContentResultChange: handleSubjectiveAnswerChange,
    handleChangeMarkdownToWysiwyg: handleAnswerChangeMarkdownToWysiwyg
  } = useEditor(setSubjectiveAnswer);

  const handleSelectCandidates = (idx: number) => {
    setClickList((prev) => {
      const newClickList = [...prev];
      newClickList[idx] = !prev[idx];
      return newClickList;
    });
  };

  return (
    <div className="">
      {theQuiz?.isSubjective ? (
        <div className="flex flex-col w-4/5 mx-auto justify-center">
          <div>
            <Viewer initialValue={theQuiz.content} />
          </div>
          <Editor
            placeholder="문제를 제출해주세요."
            previewStyle="vertical"
            height="300px"
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
            ref={subjectiveAnswerRef}
            onChange={handleSubjectiveAnswerChange}
            onBeforeConvertWysiwygToMarkdown={handleAnswerChangeMarkdownToWysiwyg}
          />
        </div>
      ) : (
        <div className="flex flex-col gap-4 w-full items-center">
          {theQuiz?.candidates?.map((candidate: string, idx: number) => (
            <button
              key={idx}
              className={`w-11/12 border ${clickList[idx] && 'bg-gray-200'}`}
              onClick={() => handleSelectCandidates(idx)}
            >
              {candidate}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizContent;
