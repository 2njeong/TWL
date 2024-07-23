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
    <div className="w-full ">
      {theQuiz?.isSubjective ? (
        <div className="flex flex-col gap-2 w-4/5 mx-auto justify-center">
          <div className="w-full bg-white rounded p-2">
            <h2 className="text-gray-400 font-semibold">문제내용</h2>
            <Viewer initialValue={theQuiz.content} />
          </div>
          <Editor
            placeholder="문제의 정답을 맞혀보세요."
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
        <div className="flex flex-col gap-3 w-4/5 mx-auto items-center">
          {theQuiz?.candidates?.map((candidate: string, idx: number) => (
            <button
              key={idx}
              className={`w-11/12 border-2 border-gray-200 rounded text-lg ${clickList[idx] && 'bg-gray-200'} ${
                !clickList[idx] && 'hover:bg-gray-100'
              }`}
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
