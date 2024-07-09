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
import { THAT_USERS_ALGORITHM } from '@/query/member/memberQueryKey';
import SubmitBtn from '@/components/makequiz/SubmitBtn';

const MakeNewAlgorithm = ({ thatUserID }: { thatUserID: string | undefined }) => {
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
    const boundSubmitalgorithm = submitAlgorithm.bind(null, thatUserID as string, content as string);
    const result = await boundSubmitalgorithm(data);
    if (result) {
      alert(result.message);
      return;
    }
    queryClient.invalidateQueries({ queryKey: [THAT_USERS_ALGORITHM] });
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
          className="resize-none min-h-28 h-auto"
        ></textarea>
      </div>
      <SubmitBtn btnProps={{ pendingText: '사과가 열리고 있어요..!', doneText: '사과 만들기' }} />
    </form>
  );
};

export default MakeNewAlgorithm;
