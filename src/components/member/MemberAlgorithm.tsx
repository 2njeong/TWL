'use client';

import { useEffect, useRef, useState } from 'react';
import { Editor } from '@toast-ui/react-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { useEditor } from '@/customHooks/common';
import { submitAlgorithm } from '@/app/member/action';
import AlgorithmQuestion from './algorithm/AlgorithmQuestion';

const MemberAlgorithm = ({
  thatUserID,
  currentUserID
}: {
  thatUserID: string | undefined;
  currentUserID: string | undefined;
}) => {
  const [writeNewPost, setWriteNewPost] = useState(true);
  const [content, setContent] = useState<string | null>(null);
  const algorithmRef = useRef<HTMLFormElement | null>(null);
  const { editorRef, handleContentResultChange, handleChangeMarkdownToWysiwyg } = useEditor(setContent);

  const inputList = [
    { title: 'Lv', name: 'level', placeholder: '문제 level' },
    { title: '제목', name: 'title', placeholder: '문제의 제목을 알려주세요.' }
  ];

  useEffect(() => {
    if (!content && editorRef.current) editorRef.current.getInstance().reset();
  }, [content, editorRef]);

  const handleNewPost = () => {
    setWriteNewPost((prev) => !prev);
  };

  const submitAlgorithmOnClient = async (data: FormData) => {
    const level = data.get('level');
    const title = data.get('title');
    const newLearn = data.get('newLearn');
    console.log(level, title, newLearn);

    const boundSubmitalgorithm = submitAlgorithm.bind(null, thatUserID as string, content as string);
    const result = await boundSubmitalgorithm(data);
    if (result) {
      alert(result.message);
      return;
    }

    algorithmRef.current?.reset();
    setContent(null);
  };

  return (
    <div className="w-full flex flex-col border min-h-[500px] h-[90%]">
      <div className="w-full flex justify-end p-2">
        {thatUserID === currentUserID && (
          <button className="border" onClick={handleNewPost}>
            오늘도 풀었다!
          </button>
        )}
      </div>
      <div className="h-full overflow-y-auto">
        {writeNewPost ? (
          <form ref={algorithmRef} action={submitAlgorithmOnClient} className="flex flex-col gap-4 justify-around">
            <div className="h-auto flex flex-col gap-2">
              <div className="flex gap-4 items-center">
                {inputList.map((input) => (
                  <AlgorithmQuestion
                    key={input.name}
                    title={input.title}
                    name={input.name}
                    placeholder={input.placeholder}
                  />
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
            <button className="border">사과</button>
          </form>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default MemberAlgorithm;
