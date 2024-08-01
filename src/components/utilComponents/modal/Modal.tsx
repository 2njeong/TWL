'use client';

import { openModal } from '@/atom/modalAtom';
import { useAtom } from 'jotai';
import ModalBackground from './ModalBackground';
import { useEffect, useRef } from 'react';
// import { animated, useTransition } from '@react-spring/web';
import { ZINDEX } from '@/constants/commonConstants';
import { Editor, Viewer } from '@toast-ui/react-editor';
import { htmlTagRegex } from '@/utils/common';
import ModalPortal from './ModalPortal';
import { updateAtom, updateContentAtom } from '@/atom/quizAtom';
import { useEditor } from '@/customHooks/common';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { updateContent } from '@/app/quiz/solve/action';
import { useQueryClient } from '@tanstack/react-query';

const Modal = () => {
  const [{ elementId, item, item_id, updateItem, queryKey, isOpen, type, title, content, onFunc, offFunc }, _] =
    useAtom(openModal);
  const modalRef = useRef<HTMLDivElement>(null);
  const [onUpdate, setOnUpdate] = useAtom(updateAtom);
  const [updatedContent, setUpdatedContent] = useAtom(updateContentAtom);
  const {
    editorRef: updateContentRef,
    handleContentResultChange: handleUpdateAnswerChange,
    handleChangeMarkdownToWysiwyg: handleUpdateAnswerChangeMarkdownToWysiwyg
  } = useEditor({ setData: setUpdatedContent, type: 'answer' });
  const queryClient = useQueryClient();
  // const transition = useTransition(isOpen, {
  //   from: { opacity: 0, transform: 'translate3d(-50%, -60%, 0)' },
  //   enter: { opacity: 1, transform: 'translate3d(-50%, -50%, 0)' },
  //   leave: { opacity: 0, transform: 'translate3d(-50%, -60%, 0)' }
  // });

  const requestModalAnimation = () => {
    requestAnimationFrame(() => {
      if (!modalRef.current) return;
      if (isOpen) {
        modalRef.current.style.transform = 'translate(-50%, -40%)';
        modalRef.current.style.opacity = '1';
        modalRef.current.style.transition = 'transform 0.3s ease-in-out';
      }
    });
  };

  useEffect(() => {
    requestModalAnimation();
  }, [isOpen]);

  const handleSubmitUpdateContent = async () => {
    const updateObj = {
      item,
      item_id,
      updateItem,
      updatedContent
    };
    const result = await updateContent(updateObj);
    if (result) {
      alert(result.message);
      return;
    }
    await queryClient.invalidateQueries({ queryKey });
    cancelModal();
    alert('수정이 완료되었습니다.');
  };

  const cancelModal = () => {
    setOnUpdate((prev) => ({
      ...prev,
      item_id: '',
      update: false
    }));
    setUpdatedContent(null);
    offFunc?.();
  };

  if (!isOpen) return;

  return (
    <>
      <ModalPortal>
        <ModalBackground cancelModal={cancelModal} />
        <div
          ref={modalRef}
          className={`min-w-[40%]  ${elementId === 'new-root' ? 'max-w-[50%]' : `max-w-[80%]`} fixed
          max-h-[80vh] top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 bg-white opacity-0 p-4 overflow-hidden`}
          style={{ zIndex: ZINDEX.modalZ }}
        >
          <button
            className="ml-auto w-6 h-6 rounded-full flex justify-center items-center hover:bg-gray-100"
            onClick={cancelModal}
          >
            X
          </button>
          <div className="flex flex-col gap-4 p-2 overflow-y-auto max-h-[calc(80vh-4rem)]">
            <h3 className="text-2xl font-bold">{title}</h3>
            {onUpdate.item_id === item_id && onUpdate.update ? (
              <>
                <div className="w-full max-h-72">
                  <Editor
                    placeholder="수정할 내용을 입력해주세요."
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
                    ref={updateContentRef}
                    onChange={handleUpdateAnswerChange}
                    onBeforeConvertWysiwygToMarkdown={handleUpdateAnswerChangeMarkdownToWysiwyg}
                  />
                </div>

                <div className="w-full flex flex-col gap-2 h-full max-h-40">
                  <h2 className="text-lg font-semibold text-gray-600">이전 내용</h2>
                  <Viewer initialValue={content} />
                </div>
              </>
            ) : item === 'algorithm' ? (
              <Viewer initialValue={content} />
            ) : content && htmlTagRegex.test(content) ? (
              <Viewer initialValue={content} />
            ) : (
              <p className="w-full h-full break-all whitespace-normal">{content}</p>
            )}
          </div>
          <div className="flex gap-3 justify-end">
            {onUpdate.item_id === item_id && onUpdate.update ? (
              <button onClick={handleSubmitUpdateContent} className="hover:bg-gray-100 rounded-md px-2">
                수정하기
              </button>
            ) : (
              <button
                onClick={() => {
                  onFunc();
                  cancelModal();
                }}
                className="hover:bg-gray-100 rounded-md px-2"
              >
                확인
              </button>
            )}
            {type === 'alert' ? null : <button onClick={cancelModal}>취소</button>}
          </div>
        </div>
      </ModalPortal>
      {/* {transition((style, item) =>
        item ? (
          <>
            <ModalBackground />
            <animated.div
              ref={modalRef}
              className="w-2/5 h-2/5 fixed top-1/2 left-1/2 flex flex-col gap-2 z-50 bg-white opacity-0 p-4"
              style={style}
            >
              Modal
              <h3>모달 제목: {title}</h3>
              <h5>모달 내용: {content}</h5>
              <div className="flex gap-2">
                <button onClick={onFunc}>확인</button>
                {type === 'alert' ? null : <button onClick={offFunc}>취소</button>}
              </div>
            </animated.div>
          </>
        ) : null
      )} */}
    </>
  );
};

export default Modal;
