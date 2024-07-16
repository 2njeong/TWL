'use client';

import { Editor } from '@toast-ui/react-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { submitAlgorithm } from '@/app/member/action';
import { useEffect, useRef, useState } from 'react';
import { useEditor } from '@/customHooks/common';
import AlgorithmQuestion from './AlgorithmQuestion';
import { useQueryClient } from '@tanstack/react-query';
import { ALGORITHM_OF_THATUSER } from '@/query/member/memberQueryKey';
import SubmitBtn from '@/components/makequiz/SubmitBtn';
import { Tables } from '@/type/database';
import { TbChristmasTree } from 'react-icons/tb';

const MakeNewAlgorithm = ({ userData }: { userData: Tables<'users'> }) => {
  const { user_id: creator, nickname: creator_nickname, avatar: creator_avatar } = userData;
  const algorithmRef = useRef<HTMLFormElement | null>(null);
  const [content, setContent] = useState<string | null>(null);
  const { editorRef, handleContentResultChange, handleChangeMarkdownToWysiwyg } = useEditor(setContent);
  const queryClient = useQueryClient();
  const inputList = [
    { title: 'Lv', name: 'level', placeholder: '문제 level' },
    { title: '제목', name: 'title', placeholder: '문제의 제목을 알려주세요.' }
  ];

  useEffect(() => {
    if (!content && editorRef.current) editorRef.current.getInstance().reset();
  }, [content, editorRef]);

  const submitAlgorithmOnClient = async (data: FormData) => {
    const algorithmSubmitObj = {
      creator,
      creator_nickname,
      creator_avatar,
      content
    };
    const result = await submitAlgorithm(algorithmSubmitObj, data);
    if (result) {
      alert(result.message);
      return;
    }
    queryClient.invalidateQueries({ queryKey: [ALGORITHM_OF_THATUSER] });
    algorithmRef.current?.reset();
    setContent(null);
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
          ref={editorRef}
          onChange={handleContentResultChange}
          onBeforeConvertWysiwygToMarkdown={handleChangeMarkdownToWysiwyg}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2>Today I Learned...</h2>
        <textarea
          name="newLearn"
          placeholder="이 문제를 통해 배운 점/ 알게된 점을 기록해보세요!"
          className="border rounded resize-none min-h-28 h-auto p-2"
        ></textarea>
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
