import { updateUserInfo } from '@/app/member/action';
import SubmitBtn from '@/components/makequiz/SubmitBtn';
import { THAT_USER_QUERY_KEY } from '@/query/auth/authQueryKeys';
import { Tables } from '@/type/database';
import { UserInfoOBJ } from '@/type/memberType';
import { useQueryClient } from '@tanstack/react-query';
import React, { Dispatch, SetStateAction, useRef } from 'react';

const UpdateUserForm = ({
  thatUserData,
  currentUser,
  userDataList,
  setUserFormOpen
}: {
  thatUserData: Tables<'users'> | undefined;
  currentUser: Tables<'users'> | undefined;
  userDataList: string[];
  setUserFormOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const userFormRef = useRef<HTMLFormElement | null>(null);
  const queryClient = useQueryClient();

  const getUserInfoObj = (data: FormData) => {
    const allowshow = data.get('allowshow');
    const userInfoObj = userDataList.reduce(
      (acc, cur) => {
        (acc as any)[cur.toLowerCase()] =
          data.get(cur) && (data.get(cur) as string).length > 0
            ? data.get(cur)
            : (thatUserData as any)[cur.toLowerCase()];
        return acc;
      },
      { user_id: currentUser?.user_id, allowshow: !allowshow } as UserInfoOBJ
    );
    return userInfoObj;
  };

  const checkAllSame = (userInfoObj: UserInfoOBJ) => {
    if (currentUser) {
      const { created_at, avatar, ...rest } = currentUser;
      const originUserObj = rest;
      const allSame = Object.entries(originUserObj).every((item) => item[1] === (userInfoObj as any)[item[0]]);
      if (allSame) {
        alert('변경된 내용이 없습니다.');
        return true;
      }
      return false;
    }
  };

  const serverActionNAlert = async (userInfoObj: UserInfoOBJ) => {
    const result = await updateUserInfo(userInfoObj);
    if (result) {
      alert(result.message);
      return true;
    }
    return false;
  };

  const updateUserInfoOnClientSide = async (data: FormData) => {
    const userInfoObj = getUserInfoObj(data);
    if (checkAllSame(userInfoObj)) {
      return;
    }
    const success = await serverActionNAlert(userInfoObj);
    if (!success) {
      return;
    }
    await queryClient.invalidateQueries({ queryKey: [THAT_USER_QUERY_KEY, currentUser?.user_id] });
    userFormRef.current?.reset();
    setUserFormOpen(false);
  };

  return (
    <>
      <form
        id="updateUserForm"
        ref={userFormRef}
        action={updateUserInfoOnClientSide}
        className="h-full relative flex flex-col px-4 justify-center gap-2"
      >
        <div className="flex flex-col justify-center gap-2">
          {userDataList.map((data) => (
            <div key={data} className="flex gap-2 items-center">
              <p>{data}: </p>
              <input
                name={data}
                placeholder={(thatUserData as any)[data.toLowerCase()] ?? '정보를 입력해주세요.'}
              ></input>
            </div>
          ))}
        </div>
        <div className="flex gap-1 items-center text-sm text-gray-600 ml-auto">
          <input type="checkbox" name="allowshow"></input>
          <p>프로필 비공개를 원해요(현재 {currentUser?.allowshow ? '공개' : '비공개'})</p>
        </div>
        <SubmitBtn
          btnProps={{
            formId: 'updateUserForm',
            sectionClasName: 'absolute bottom-0 right-0',
            buttonClassName: 'ml-auto',
            pendingText: '수정 중...',
            doneText: '수정'
          }}
        />
      </form>
    </>
  );
};

export default UpdateUserForm;
