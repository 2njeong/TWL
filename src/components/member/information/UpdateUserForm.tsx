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

  const updateUserInfoOnClientSide = async (data: FormData) => {
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

    const result = await updateUserInfo(userInfoObj);
    // console.log('result =>', result);
    if (result) {
      alert(result.message);
      return;
    }
    await queryClient.invalidateQueries({ queryKey: [THAT_USER_QUERY_KEY, currentUser?.user_id] });
    userFormRef.current?.reset();
    setUserFormOpen(false);
  };

  return (
    <form ref={userFormRef} action={updateUserInfoOnClientSide} className="flex flex-col px-4 justify-center gap-5">
      <div className="flex flex-col gap-2">
        {userDataList.map((data) => (
          <div key={data} className="flex gap-2 items-center">
            <p>{data}: </p>
            <input
              name={data}
              placeholder={(thatUserData as any)[data.toLowerCase()] ?? '정보를 입력해주세요.'}
            ></input>
          </div>
        ))}
        <div className="flex gap-1 items-center text-sm text-gray-600 ml-auto">
          <input type="checkbox" name="allowshow"></input>
          <p>프로필 비공개를 원해요(현재 {currentUser?.allowshow ? '공개' : '비공개'})</p>
        </div>
      </div>
      <SubmitBtn btnProps={{ buttonClassName: 'ml-auto', pendingText: '수정 중...', doneText: '수정' }} />
    </form>
  );
};

export default UpdateUserForm;
