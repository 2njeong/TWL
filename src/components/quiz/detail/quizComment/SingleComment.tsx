'use client';

import AvatarImage from '@/components/member/information/AvatarImage';
import DeleteBtn from '@/components/utilComponents/DeleteBtn';
import HoverCreator from '@/components/utilComponents/HoverCreator';
import { useGetCurrentUser, useHoverEvent } from '@/customHooks/common';
import { QUIZ_COMMENTS_QUERY_KEY } from '@/query/quiz/quizQueryKeys';
import { Comment } from '@/type/quizType';
import { getformattedDate, getHoursDifference } from '@/utils/utilFns';

const SingleComment = ({ comment, quiz_id }: { comment: Comment; quiz_id: string | undefined }) => {
  const { user_id: currentUserId } = useGetCurrentUser() ?? {};
  const { isCreatorOpen, events } = useHoverEvent();

  const deleteBtnProps = {
    item: 'comments',
    queryKey: QUIZ_COMMENTS_QUERY_KEY,
    additionalKey: [quiz_id as string],
    containerClassName: 'w-8',
    btnContainerClassName: 'w-7 h-7',
    btnClassName: 'text-xl cursor-pointer',
    hoverContainerClassName: 'w-14 h-7 p-1 -bottom-8 -left-6',
    hoverBtnClassName: 'text-sm'
  };

  const creatorProps = {
    isCreatorOpen,
    creator: comment.comment_creator,
    avatar: comment.avatar,
    nickname: comment.nickname
  };
  return (
    <div key={comment.comment_id} className="flex gap-4 border-b p-2 h-full min-h-20">
      <div
        className={`relative ${currentUserId === comment.comment_creator ? 'w-14' : 'w-16'} ml-2 flex items-center`}
        {...events()}
      >
        <AvatarImage src={comment.avatar} alt="댓글 주인 아바타" size="3.5" />
        <HoverCreator {...creatorProps} />
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="w-full flex gap-2 items-center justify-between min-h-8">
          <div className="w-full flex gap-2 items-center justify-between">
            <p className="text-sm text-gray-500 font-bold">@&nbsp;{comment.nickname ?? '익명의 유저'}</p>

            {getHoursDifference(comment.created_at).hours < 48 ? (
              <p className="text-xs text-gray-500">
                {getHoursDifference(comment.created_at).hours > 0 &&
                  `${getHoursDifference(comment.created_at).hours}시간`}{' '}
                {getHoursDifference(comment.created_at).minutes > 0
                  ? `${getHoursDifference(comment.created_at).minutes}분 전`
                  : '지금'}
              </p>
            ) : (
              <p className="text-xs">{getformattedDate(comment.created_at)}</p>
            )}
          </div>
          {comment.comment_creator === currentUserId && <DeleteBtn item_id={comment.comment_id} {...deleteBtnProps} />}
        </div>
        <div className="w-full px-2">
          <p className="break-all whitespace-normal overflow-wrap"> {comment.comment_content}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleComment;
