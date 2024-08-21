'use client';

import UserInfo from '@/components/member/information/UserInfo';
import { useFetchCurrentUser, useFetchThatUser } from '@/query/useQueries/useAuthQuery';
import SetCategory from './SetCategory';
import TheCategory from './TheCategory';
import { useFetchGuestbookAlarm } from '@/query/useQueries/useAlarmQuery';

const MemberPage = ({ params: { id } }: { params: { id: string } }) => {
  const { isThatUserLoading } = useFetchThatUser(id);
  const { isLoading, userData } = useFetchCurrentUser();
  const { guestbookAlarmLoading } = useFetchGuestbookAlarm(userData?.user_id);
  const categories = ['질문', '알고리즘', 'Todo', '방명록'];

  if (isThatUserLoading || isLoading || guestbookAlarmLoading) return;
  return (
    <>
      <div className="border border-2 rounded w-full min-h-[550px] h-full max-h-[90%] flex justify-between relative">
        <UserInfo id={id} />
        <TheCategory id={id} categories={categories} />
        <SetCategory id={id} categories={categories} />
      </div>
    </>
  );
};

export default MemberPage;
