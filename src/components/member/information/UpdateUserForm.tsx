import { updateUserInfo } from '@/app/member/action';
import { avatarAtom } from '@/atom/memberAtom';
import SubmitBtn from '@/components/makequiz/SubmitBtn';
import { CURRENT_USER_QUERY_KEY } from '@/query/auth/authQueryKeys';
import { Tables } from '@/type/database';
import { UserInfoOBJ } from '@/type/memberType';
import { useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import React, { Dispatch, SetStateAction, useRef } from 'react';

const UpdateUserForm = ({
  currentUser,
  userDataList,
  setUserFormOpen
}: {
  currentUser: Tables<'users'> | undefined;
  userDataList: string[];
  setUserFormOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const userFormRef = useRef<HTMLFormElement | null>(null);
  const queryClient = useQueryClient();
  const [_, setAvatar] = useAtom(avatarAtom);

  const getUserInfoObj = (data: FormData) => {
    const allowshow = currentUser?.allowshow ? !data.get('allowshow') : !!data.get('allowshow');
    const userInfoObj = userDataList.reduce(
      (acc, cur) => {
        (acc as any)[cur.toLowerCase()] =
          data.get(cur) && (data.get(cur) as string).length > 0
            ? data.get(cur)
            : (currentUser as any)[cur.toLowerCase()];
        return acc;
      },
      { user_id: currentUser?.user_id, allowshow, avatar: currentUser?.avatar } as UserInfoOBJ
    );
    return userInfoObj;
  };

  const checkAllSame = (userInfoObj: UserInfoOBJ) => {
    if (currentUser) {
      const { created_at, ...rest } = currentUser;
      const originUserObj = rest;
      const allSame = Object.entries(originUserObj).every((item) => item[1] === (userInfoObj as any)[item[0]]);
      if (allSame) {
        alert('변경된 내용이 없습니다.');
        return true;
      }
      return false;
    }
  };

  const serverActionNAlert = async (userInfoObj: UserInfoOBJ, data: FormData) => {
    const result = await updateUserInfo(userInfoObj, data);
    if (result) {
      alert(result.message);
      return false;
    }
    return true;
  };

  const resetAfterReset = async () => {
    await queryClient.invalidateQueries({ queryKey: [CURRENT_USER_QUERY_KEY] });
    userFormRef.current?.reset();
    setUserFormOpen(false);
    setAvatar(null);
  };

  const updateUserInfoOnClientSide = async (data: FormData) => {
    const userInfoObj = getUserInfoObj(data);
    if (checkAllSame(userInfoObj)) {
      return;
    }
    const success = await serverActionNAlert(userInfoObj, data);
    if (!success) {
      return;
    }
    await resetAfterReset();
  };

  const btnProps = {
    formId: 'updateUserForm',
    sectionClassName: 'absolute bottom-0 right-0',
    buttonClassName: 'ml-auto bg-gray-100 hover:bg-gray-200 px-2 rounded-md',
    pendingText: '수정 중...',
    doneText: '수정'
  };

  return (
    <form
      id="updateUserForm"
      ref={userFormRef}
      action={updateUserInfoOnClientSide}
      className="w-full h-full relative flex flex-col justify-center gap-2"
    >
      <div className="flex flex-col justify-center gap-2">
        {userDataList.map((data) => (
          <div key={data} className="flex gap-2 items-center">
            <p>{data}: </p>
            <input
              name={data}
              placeholder={(currentUser as any)[data.toLowerCase()] ?? '정보를 입력해주세요.'}
              className="w-full"
            ></input>
          </div>
        ))}
      </div>
      <div className="flex gap-1 items-center text-sm text-gray-600 ml-auto">
        <input type="checkbox" name="allowshow"></input>
        <p>프로필</p>
        <p className="text-blue-600">{currentUser?.allowshow ? '비공개' : '공개'}</p>
        <p>를 원해요 (현재:</p>
        <p className="text-blue-600"> {currentUser?.allowshow ? '공개' : '비공개'}</p>
        <p>)</p>
      </div>
      <SubmitBtn btnProps={btnProps} />
    </form>
  );
};

export default UpdateUserForm;
