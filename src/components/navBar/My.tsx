'use client';

import { checkLoginAtom } from '@/atom/authAtom';
import { ZINDEX } from '@/constants/commonConstants';
import { useFetchCurrentUser } from '@/query/useQueries/useAuthQuery';
import { clientSupabase } from '@/supabase/client';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AvatarImage from '../member/information/AvatarImage';
import { openNewWindow } from '@/utils/utilFns';
import QuizCommentsAlarm from './QuizCommentsAlarm';
import { useQueryClient } from '@tanstack/react-query';
import { ALARM_GUESTBOOK_QUERY_KEY, ALARM_QUIZ_COMMENTS_QUERY_KEY } from '@/query/alarm/alarmQueryKey';
import { useFetchGuestbookAlarm, useFetchQuizCommentsAlarms } from '@/query/useQueries/useAlarmQuery';
import GuestbookAlarm from './GuestbookAlarm';

const My = () => {
  const [isLoggedIn, _] = useAtom(checkLoginAtom);
  const [isMyListOpen, setMyListOpen] = useState(false);
  const queryClient = useQueryClient();
  const { isLoading, userData } = useFetchCurrentUser();
  const { quizCommentsAlarms, quizCommentsAlarmLoading } = useFetchQuizCommentsAlarms(userData?.user_id);
  const { guestbookAlarms, guestbookAlarmLoading } = useFetchGuestbookAlarm(userData?.user_id);

  useEffect(() => {
    const channel = clientSupabase
      .channel('quizCommentsAlarm')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'comments' }, (payload) => {
        queryClient.invalidateQueries({
          queryKey: [ALARM_QUIZ_COMMENTS_QUERY_KEY]
        });
      })
      .subscribe();
    return () => {
      clientSupabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    const channel = clientSupabase
      .channel('guestbookAlarm')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'guestbook' }, (payload) => {
        queryClient.invalidateQueries({
          queryKey: [ALARM_GUESTBOOK_QUERY_KEY]
        });
      })
      .subscribe();
    return () => {
      clientSupabase.removeChannel(channel);
    };
  }, [queryClient]);

  const handleMouse = () => {
    setMyListOpen((prev) => !prev);
  };

  const handleTouchMove = (e: React.TouchEvent<Element>) => {
    if (e) {
      setMyListOpen(true);
    } else {
      setMyListOpen(false);
    }
  };

  const events = () => ({
    onMouseEnter: () => handleMouse(),
    onMouseLeave: () => handleMouse(),
    onTouchMove: (e: React.TouchEvent<Element>) => handleTouchMove(e)
  });

  const handleSignOut = async () => {
    const { error } = await clientSupabase.auth.signOut();
    if (error) throw new Error(error.message);
    location.replace('/auth');
  };

  const myList = [
    { text: '내스터디', func: () => openNewWindow(userData?.user_id) },
    { text: '로그아웃', func: handleSignOut }
  ];

  if (isLoading) return <div>...</div>;

  return (
    <section className="flex gap-4 items-center">
      <div className="flex items-center text-green-600 text-lg max-sm:hidden">
        <h2 className="font-semibold">T</h2>
        <h2>oday&nbsp;</h2>
        <h2 className="font-semibold">W</h2>
        <h2>e&nbsp;</h2>
        <h2 className="font-semibold">L</h2>
        <h2>earned</h2>
      </div>

      {!isLoggedIn && (
        <Link href="/auth" className="my-auto rounded-lg bg-green-300 hover:text-white px-2 py-1">
          로그인/회원가입
        </Link>
      )}
      {isLoggedIn && (
        <div {...events()} className="relative">
          <div className="my-2 relative">
            <AvatarImage src={userData?.avatar} alt="current user Img" size="3" className="border-2" />
            {quizCommentsAlarms && quizCommentsAlarms.length > 0 && (
              <div className="absolute -top-1.5 right-0 w-2.5 h-2.5 rounded-full animate-pulse bg-red-500 flex items-center justify-center"></div>
            )}
          </div>
          {isMyListOpen && (
            <div
              className={`${
                quizCommentsAlarms && quizCommentsAlarms?.length > 0 ? 'w-72' : 'w-36'
              } h-22 max-h-[32rem] bg-white rounded absolute top-full right-[-30%] flex flex-col gap-2 justify-around border rounded p-2 overflow-y-auto`}
              style={{ zIndex: ZINDEX.navBarZ }}
            >
              <div
                className={`flex flex-col gap-1 ${quizCommentsAlarms && quizCommentsAlarms.length > 0 && 'border-b-2'}`}
              >
                {myList.map((item) => (
                  <button key={item.text} onClick={item.func} className="rounded hover:bg-gray-100 p-1">
                    {item.text}
                  </button>
                ))}
              </div>
              {quizCommentsAlarmLoading || guestbookAlarmLoading ? (
                <div className="w-full flex items-center justify-center text-gray-500">새로운 알림 로딩중..</div>
              ) : (
                <div className="w-full flex flex-col gap-1">
                  <QuizCommentsAlarm quizCommentsAlarms={quizCommentsAlarms} />
                  <GuestbookAlarm guestbookAlarms={guestbookAlarms} />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default My;
