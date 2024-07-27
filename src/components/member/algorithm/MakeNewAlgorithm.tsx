'use client';

import { Editor } from '@toast-ui/react-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { submitAlgorithm } from '@/app/member/action';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useEditor, useGetThatUser } from '@/customHooks/common';
import AlgorithmQuestion from './AlgorithmQuestion';
import { useQueryClient } from '@tanstack/react-query';
import { ALGORITHM_OF_THATUSER } from '@/query/member/memberQueryKey';
import SubmitBtn from '@/components/makequiz/SubmitBtn';
import { TbChristmasTree } from 'react-icons/tb';

const MakeNewAlgorithm = ({
  id,
  setWriteNewPost
}: {
  id: string;
  setWriteNewPost: Dispatch<SetStateAction<boolean>>;
}) => {
  const { user_id: creator } = useGetThatUser(id);
  const algorithmRef = useRef<HTMLFormElement | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [newLearn, setNewLearn] = useState<string | null>(null);
  const {
    editorRef: explainRef,
    handleContentResultChange: explainResultChange,
    handleChangeMarkdownToWysiwyg: explainMarkdownToWysiwyg
  } = useEditor({ setData: setExplanation });
  const {
    editorRef: newLearnRef,
    handleContentResultChange: newLearnResultChange,
    handleChangeMarkdownToWysiwyg: newLearnMarkdownToWysiwyg
  } = useEditor({ setData: setNewLearn });
  const queryClient = useQueryClient();
  const inputList = [
    { title: 'Lv', name: 'level', placeholder: '문제 level' },
    { title: '제목', name: 'title', placeholder: '문제의 제목을 알려주세요.' }
  ];

  useEffect(() => {
    if (!explanation && explainRef.current) explainRef.current.getInstance().reset();
    if (!newLearn && newLearnRef.current) newLearnRef.current.getInstance().reset();
  }, [explanation, explainRef, newLearn, newLearnRef]);

  const submitAlgorithmOnClient = async (data: FormData) => {
    const algorithmSubmitObj = {
      creator,
      explanation,
      newLearn
    };
    const result = await submitAlgorithm(algorithmSubmitObj, data);
    if (result) {
      alert(result.message);
      return;
    }
    queryClient.invalidateQueries({ queryKey: [ALGORITHM_OF_THATUSER] });
    algorithmRef.current?.reset();
    setExplanation(null);
    setNewLearn(null);
    setWriteNewPost(false);
  };

  return (
    <form ref={algorithmRef} action={submitAlgorithmOnClient} className="flex flex-col gap-4 justify-around">
      <div className="h-auto flex flex-col gap-2">
        <div className="flex gap-4 items-center">
          {inputList.map((input) => (
            <AlgorithmQuestion key={input.name} title={input.title} name={input.name} placeholder={input.placeholder} />
          ))}
        </div>
        <AlgorithmQuestion title="Link" name="link" placeholder="알고리즘 문제의 링크를 복사해주세요." />
      </div>
      <div>
        <Editor
          placeholder="본인의 풀이를 알려주세요!"
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
          ref={explainRef}
          onChange={explainResultChange}
          onBeforeConvertWysiwygToMarkdown={explainMarkdownToWysiwyg}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2>Today I Learned...</h2>
        {/* <textarea
          name="newLearn"
          placeholder="이 문제를 통해 배운 점/ 알게된 점을 기록해보세요!"
          className="border rounded resize-none min-h-28 h-auto p-2"
        ></textarea> */}
        <Editor
          placeholder="이 문제를 통해 배운 점/ 알게된 점을 기록해보세요!"
          previewStyle="vertical"
          height="200px"
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
          ref={newLearnRef}
          onChange={newLearnResultChange}
          onBeforeConvertWysiwygToMarkdown={newLearnMarkdownToWysiwyg}
        />
      </div>
      <SubmitBtn
        btnProps={{
          buttonClassName: 'w-2/6 border border-2 rounded rounded-md text-lg p-1',
          pendingText: <TbChristmasTree className="text-3xl mx-auto" />,
          doneText: '트리 장식하기'
        }}
      />
    </form>
  );
};

export default MakeNewAlgorithm;
