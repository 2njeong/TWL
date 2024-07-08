'use client';

import { useEffect, useRef, useState } from 'react';
import { Editor } from '@toast-ui/react-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { useEditor } from '@/customHooks/common';
import { submitAlgorithm } from '@/app/member/action';

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
            <div className="h-8 flex gap-2 items-center">
              <div className="flex gap-2">
                <h1>Lv.</h1>
                <input name="level"></input>
              </div>
              <div className="flex gap-2">
                <h1>제목: </h1>
                <input name="title"></input>
              </div>
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
              <h2>이 문제를 통해 알게된 점</h2>
              <textarea name="newLearn" className="resize-none min-h-28 h-auto"></textarea>
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
